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
    return render_template("index.html", sentence=sentence)


if __name__ == '__main__':
    app.run(debug=True)