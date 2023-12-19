from flask import Flask, render_template, request, jsonify
from mistral_7b import generate_text 

app = Flask(__name__, static_url_path='/static')

#@app.route('/')
#def home():
#    return 'Hello, World!'

app = Flask(__name__)

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
@app.route('/process_input', methods=['POST'])
def process_input():
    # 전송된 JSON 데이터 받기
    data = request.get_json()
    input_text = data.get('input', '')

    # 여기서 모델을 사용하여 답변을 생성
    answer = generate_text(input_text)

    # 결과를 JSON 형식으로 반환
    return jsonify({'answer': answer, 'jeju_answer': answer})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
