FROM python:3.8

WORKDIR /code
COPY requirements.txt .

# hadolint ignore=DL3013 (pin versions in pip)
RUN python -m pip install --no-cache-dir --upgrade pip setuptools wheel && \
    pip install --no-cache-dir -r requirements.txt

COPY main.py .

EXPOSE 8000
CMD [ "uvicorn", "main:app", "--host", "0.0.0.0"]
