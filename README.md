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

## lint using superlinter

```bash
# from https://github.com/github/super-linter/blob/main/docs/run-linter-locally.md
docker run --rm -e RUN_LOCAL=true -e USE_FIND_ALGORITHM=true -v $(pwd):/tmp/lint github/super-linter:slim-v4
```

Notes: I tried [superlinter](https://github.com/github/super-linter/blob/main/docs/run-linter-locally.md), but it's really difficult to restrict it to certain files and will also include e.g. `venv` and `.mypy-cache`:

> This means it will scan all the files in the directory you have mapped. If you want to only validate a subset of your codebase, map a folder with only the files you wish to have linted.

## create AWS defaults manually

```bash
# create S3 bucket
...

# create container registry
aws create-repository

# create kubeflow cluster
...
```
