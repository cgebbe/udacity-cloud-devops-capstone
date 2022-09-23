# Capstone project

Capstone project for Cloud DevOps Engineer Nanodegree.

## How to use

```bash
# start backend server
cd backend
source venv/bin/activate
uvicorn main:app --reload

# open frontend page
google-chrome ../frontend/index.html
```

## build docker

```bash
DOCKER_NAME="udacity-cloud-devops-capstone"
docker build -t $DOCKER_NAME .

docker run --rm -d -p 8000:8000 $DOCKER_NAME
```
