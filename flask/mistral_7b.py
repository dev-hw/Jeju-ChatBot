# mistral_7b.py

from transformers import AutoModelForCausalLM, AutoTokenizer, TextStreamer, GenerationConfig

gpt_model_name = 'davidkim205/komt-mistral-7b-v1'
gpt_model = AutoModelForCausalLM.from_pretrained(gpt_model_name, device_map="auto")
gpt_tokenizer = AutoTokenizer.from_pretrained(gpt_model_name)
gpt_streamer = TextStreamer(gpt_tokenizer)


# GPT-3.5 모델을 사용하여 텍스트 생성 및 반환
def generate_text(x):
    generation_config = GenerationConfig(
        temperature=0.8,
        top_p=0.8,
        top_k=100,
        max_new_tokens=100,
        early_stopping=True,
        do_sample=True,
    )
    input_text = f"[INST]대화하듯이 답변을 해주세요.\n입력 : {x} [/INST]"
    generated_tokens = gpt_model.generate(
        **gpt_tokenizer(
            input_text,
            return_tensors='pt',
            return_token_type_ids=False
        ).to('cuda'),
        generation_config=generation_config,
        pad_token_id=gpt_tokenizer.eos_token_id,
        eos_token_id=gpt_tokenizer.eos_token_id,
        streamer=gpt_streamer,
    )
    generated_text = gpt_tokenizer.decode(generated_tokens[0])
    print(generated_text)

    start_tag = f"\n\n### Response: "
    start_index = generated_text.find(start_tag)

    if start_index != -1:
        generated_text = generated_text[start_index + len(start_tag):].strip()
        
    generated_text = generated_text.replace("<s>", "").replace("</s>", "")
    if "[/INST]" in generated_text:
        a, b = generated_text.split("[/INST]")
        generated_text = b

    return generated_text
