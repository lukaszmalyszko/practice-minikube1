FROM python:2.7-slim

COPY requirements.txt /tmp

WORKDIR /tmp

RUN pip install --trusted-host pypi.python.org -r requirements.txt

EXPOSE 80

COPY bot.py .

CMD ["python", "bot.py"]
