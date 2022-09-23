FROM python:3.8

COPY requirements.txt .

RUN python -m pip install --upgrade pip setuptools wheel
RUN pip install -r requirements.txt

COPY main.py .

EXPOSE 8000 
CMD [ "uvicorn", "main:app", "--host", "0.0.0.0"]