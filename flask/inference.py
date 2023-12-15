import os
import torch
import torchaudio
from TTS.tts.configs.xtts_config import XttsConfig
from TTS.tts.models.xtts import Xtts

# Add here the xtts_config path
CONFIG_PATH = "/content/fine-tunning-result/speakerjj393_50/run/training/XTTS_v2.0_original_model_files/config.json"
# Add here the vocab file that you have used to train the model
TOKENIZER_PATH = "/content/fine-tunning-result/speakerjj393_50/run/training/XTTS_v2.0_original_model_files/vocab.json"
# Add here the checkpoint that you want to do inference with
XTTS_CHECKPOINT = "/content/fine-tunning-result/speakerjj393_50/run/training/GPT_XTTS_FT-December-13-2023_10+17AM-c99e885c/best_model.pth"
# Add here the speaker reference
SPEAKER_REFERENCE = "/content/fine-tunning-result/speakerjj393_50/dataset/wavs/say_set1_collectorjj71_speakerjj393_46_0_19_00000000.wav"

# output wav path
OUTPUT_WAV_PATH = "static/result.wav"

print("Loading model...")
config = XttsConfig()
config.load_json(CONFIG_PATH)
model = Xtts.init_from_config(config)
model.load_checkpoint(config, checkpoint_path=XTTS_CHECKPOINT, vocab_path=TOKENIZER_PATH, use_deepspeed=False)
model.cuda()

print("Computing speaker latents...")
gpt_cond_latent, speaker_embedding = model.get_conditioning_latents(audio_path=[SPEAKER_REFERENCE])



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
    torchaudio.save(OUTPUT_WAV_PATH, torch.tensor(out["wav"]).unsqueeze(0), 24000)