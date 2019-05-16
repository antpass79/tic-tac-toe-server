FROM tensorflow/tensorflow:latest-py3
LABEL maintainer="Antonio Passalacqua" version="0.1"

COPY requirements.txt requirements.txt 
COPY src src

RUN pip install -r requirements.txt

ENTRYPOINT ["python3", "src/TicTacToeService.py"]

# FROM nginx:alpine

# COPY nginx/default.conf /etc/nginx/nginx.conf

# WORKDIR /usr/share/nginx/html
# COPY requirements.txt requirements.txt 
# COPY src src

# RUN pip install -r requirements.txt

# ENTRYPOINT ["python3", "src/TicTacToeService.py"]
