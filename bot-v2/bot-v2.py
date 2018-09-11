from flask import Flask, request, jsonify, abort
import random, logging
 
# Sentences we'll respond with if the user greeted us
GREETING_KEYWORDS = ("hello", "hi", "greetings", "sup", "what's up",)
 
GREETING_RESPONSES = ["sup bro :)", "hey :)", "*nods* :)", "hey you get my snap? :)"]
 
app = Flask(__name__)
app.logger.addHandler(logging.StreamHandler())
app.logger.setLevel(logging.INFO)
 
@app.route('/get_sentence', methods=['GET'])
def get_sentence():
    word = request.args.get('message')
    if word in GREETING_KEYWORDS:
        return jsonify(random.choice(GREETING_RESPONSES))
    else:
        if 'fail' in request.headers:
            if float(request.headers['fail']) >= round(random.random(),1):
                abort(500) 
        app.logger.warning('Unable to send response')
        return jsonify("man, i can't understand you :(")
 
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)