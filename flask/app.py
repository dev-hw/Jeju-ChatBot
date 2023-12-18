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
    voice_inference(sentence)
    return sentence

@app.route('/chatbot')
def chatbot():
    return render_template("chatbot.html")


if __name__ == '__main__':
    app.run(debug=True)