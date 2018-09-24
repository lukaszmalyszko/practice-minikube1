FROM python:2.7-slim

COPY requirements.txt /tmp

WORKDIR /tmp

RUN apt-get update && apt-get install -y curl

RUN pip install --trusted-host pypi.python.org -r requirements.txt

EXPOSE 8080

COPY bot-v3.py .

CMD ["python", "bot-v3.py"]
