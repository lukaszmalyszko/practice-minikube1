from prometheus_client import Summary, MetricsHandler, Counter, generate_latest, CONTENT_TYPE_LATEST
from flask import Flask, Response, request, jsonify
import random, logging, requests, time

# Create a metric to track time spent and requests made.
REQUEST_TIME = Summary('request_processing_seconds', 'Time spent processing request')

# Create a metric to count the number of runs on process_request()
c = Counter('requests_for_host', 'Number of runs of the process_request method', ['method', 'endpoint'])

app = Flask(__name__)

@app.route('/', methods=['GET'])
@REQUEST_TIME.time()
def get_sentence():
	path = str(request.path)
	verb = request.method
	label_dict = {"method": verb, "endpoint": path}
	c.labels(**label_dict).inc()

	message = {'message' : request.args.get('message')}
	headers = {key: value for (key, value) in request.headers if key != 'Host'}
	return requests.get('http://bot:8080/get_sentence', params=message, headers=headers).content

@app.route('/metrics')
def metrics():  
    return Response(generate_latest(), mimetype=CONTENT_TYPE_LATEST)

if __name__ == "__main__":
	app.run(host='0.0.0.0', port=8080)
