from flask import Flask, request, jsonify
import random

# Sentences we'll respond with if the user greeted us
GREETING_KEYWORDS = ("hello", "hi", "greetings", "sup", "what's up",)

GREETING_RESPONSES = ["'sup bro", "hey", "*nods*", "hey you get my snap?"]

app = Flask(__name__)

@app.route('/get_sentence', methods=['GET'])
def get_sentence():
    word = request.get_json(silent=True)
    if word['message'] in GREETING_KEYWORDS:
        return jsonify(random.choice(GREETING_RESPONSES))

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
