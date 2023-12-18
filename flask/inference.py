import os
import torch
import torchaudio
from TTS.tts.configs.xtts_config import XttsConfig
from TTS.tts.models.xtts import Xtts
import time

# Add here the xtts_config path
CONFIG_PATH = "/content/fine-tunning-result/speakerjj393_50/run/training/XTTS_v2.0_original_model_files/config.json"
# Add here the vocab file that you have used to train the model
TOKENIZER_PATH = "/content/fine-tunning-result/speakerjj393_50/run/training/XTTS_v2.0_original_model_files/vocab.json"
# Add here the checkpoint that you want to do inference with
XTTS_CHECKPOINT = "/content/fine-tunning-result/speakerjj393_50/run/training/GPT_XTTS_FT-December-13-2023_10+17AM-c99e885c/best_model.pth"
# Add here the speaker reference
SPEAKER_REFERENCE = "/content/fine-tunning-result/speakerjj393_50/dataset/wavs/say_set1_collectorjj71_speakerjj393_46_0_19_00000000.wav"

# output wav path
OUTPUT_WAV_PATH = ""

print("Loading model...")
config = XttsConfig()
config.load_json(CONFIG_PATH)
model = Xtts.init_from_config(config)
model.load_checkpoint(config, checkpoint_path=XTTS_CHECKPOINT, vocab_path=TOKENIZER_PATH, use_deepspeed=False)
model.cuda()

print("Computing speaker latents...")
gpt_cond_latent, speaker_embedding = model.get_conditioning_latents(audio_path=[SPEAKER_REFERENCE])





# 음성을 만든 후 static/result.wav 파일 저장
def voice_inference(sentence):
    print("Inference...")
    
    out = model.inference(
        sentence,
        "ko",
        gpt_cond_latent,
        speaker_embedding,
        temperature=0.7, # Add custom parameters here
        top_k = 55  # default is 50 / 값이 낮을수록 유사한 출력 
    )
    output_data_numpy = torch.tensor(out["wav"]).unsqueeze(0)
    
    # 중복되지 않는 파일명 생성
    n = time.localtime() #현재시간
    s = 'static/wav/%04d-%02d-%02d-%02d-%02d-%02d.wav' % (n.tm_year, n.tm_mon, n.tm_mday, n.tm_hour, n.tm_min, n.tm_sec)
    OUTPUT_WAV_PATH = s
    
    # 음성 파일 저장
    torchaudio.save(OUTPUT_WAV_PATH, output_data_numpy, 24000)
    
    # 파일이 생성될 때까지 기다림
    while not os.path.exists(OUTPUT_WAV_PATH):
        time.sleep(1)  # 1초 대기 후 다시 확인
       
    print(f"WAV 파일이 생성되었습니다: {OUTPUT_WAV_PATH}")
    
    return OUTPUT_WAV_PATH