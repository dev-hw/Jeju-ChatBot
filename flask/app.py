from flask import Flask, render_template
from inference import voice_inference

app = Flask(__name__, static_url_path='/static')

#@app.route('/')
#def home():
#    return 'Hello, World!'


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

@app.route('/question/<question>')
def question(question):
    # voice_inference(sentence)
    # result = answer_inference(question)
    result = ""
    return result

if __name__ == '__main__':
    app.run(debug=True)