from flask import Flask, render_template, request, jsonify
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer, pipeline
from mistral_7b import generate_text 
import torch  
from inference import voice_inference


app = Flask(__name__, static_url_path='/static')

# 모델 및 토크나이저 로드
tokenizer_name = "gogamza/kobart-base-v2"
tokenizer = AutoTokenizer.from_pretrained(tokenizer_name)  # 토크나이저 수정

model_name = "/content/flask/eojin/checkpoint-59383"
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)  # 모델 수정

# Pipeline을 이용해서 학습한 모델로 텍스트 생성해보기
nlg_pipeline = pipeline('translation_ko_to_ko', model=model, tokenizer=tokenizer)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/voice/<sentence>')
def voice(sentence):
    OUTPUT_WAV_PATH = voice_inference(sentence)
    return OUTPUT_WAV_PATH

@app.route('/chatbot')
def chatbot():
    return render_template("chatbot.html")

# 입력을 처리하는 경로
@app.route('/process_input/<input_text>')
def process_input(input_text):
    try:
        print("input_text", input_text, "==========================================")
        
        # answer 받기
        with torch.no_grad():
            answer = generate_text(input_text)
        
        print(answer, "=============================================")
        
        # 텍스트 말투 변환 모델을 사용하여 제주도 사투리로 변환
        jeju_answer = nlg_pipeline(answer, max_length=60)[0]['translation_text']

        print(jeju_answer, "=============================================")
        
        # 결과를 JSON 형식으로 반환
        return jsonify({'answer': answer, 'jeju_answer': jeju_answer})
    
    except Exception as e:
        print("Exception:", str(e))
        # 예외 발생 시 에러 메시지를 JSON 형식으로 반환
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
