from transformers import AutoModelForSeq2SeqLM, AutoTokenizer, pipeline
import os

# 모델 및 토크나이저 로드
model_name = "gogamza/kobart-base-v2"
tokenizer = AutoTokenizer.from_pretrained(model_name)  # 토크나이저 수정

model_name = "/content/flask/eojin/checkpoint-142243"
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)  # 모델 수정


# Pipeline을 이용해서 학습한 모델로 텍스트 생성해보기
nlg_pipeline = pipeline('translation_ko_to_ko', model=model, tokenizer=tokenizer)
target_styles = ['formal', 'jeju']
style_map = {
    'formal': '표준어',
    'jeju':'제주도'
}

def translation(pipe, text, target_style, num_return_sequences=5, max_length=60):
    target_style_name = style_map[target_style]
    text = f"{target_style_name} 말투로 변환:{text}"
    out = pipe(text, num_return_sequences=num_return_sequences, max_length=max_length)
    return [x['translation_text'] for x in out]

# 예시 문장
src_text = """
안녕하세요
"""

print("입력 문장:", src_text)
for style in target_styles:
    print(style, translation(nlg_pipeline, src_text, style, num_return_sequences=1, max_length=1000)[0])

