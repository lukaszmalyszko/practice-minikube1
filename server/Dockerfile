FROM python:3.7-slim

COPY requirements.txt /tmp

WORKDIR /tmp

RUN pip install --trusted-host pypi.python.org -r requirements.txt

EXPOSE 8080

COPY server.py .

CMD [ "python", "server.py"]



