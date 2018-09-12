FROM python:2.7-slim

COPY requirements.txt /tmp

WORKDIR /tmp

RUN pip install --trusted-host pypi.python.org -r requirements.txt

EXPOSE 8080

COPY bot-v1.py .

CMD ["python", "bot-v1.py"]
