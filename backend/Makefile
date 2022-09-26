fix-versions:
	pip-compile --extra=dev -o requirements-dev.txt pyproject.toml
	pip-compile -o requirements.txt pyproject.toml

install:
	. venv/bin/activate && pip install -r requirements-dev.txt

lint:
	. venv/bin/activate && pre-commit run --all-files


# https://docs.aws.amazon.com/cli/latest/reference/ecr/create-repository.html
# https://docs.aws.amazon.com/cli/latest/reference/ecr-public/create-repository.html
# The udacity user cannot create a public repository.
init-docker-registry:
	aws ecr create-repository --repository-name capstone

build-docker:
	docker build -t capstone .

test-built-docker:
	curl...

ECR_NAME=958160457995.dkr.ecr.us-east-1.amazonaws.com
IMAGE_NAME=${ECR_NAME}/capstone:latest
upload-docker:
	aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${ECR_NAME}
	docker tag capstone:latest ${IMAGE_NAME}
	docker push ${IMAGE_NAME}


create-kubernetes-cluster:
	eksctl create cluster --name capstone --region us-east-1 --node-type t3.micro
	kubectl get nodes

destroy-kubernetes-cluster:
	eksctl delete cluster --name capstone

DEPLOY_NAME=capstone-backend
deploy-docker:
	kubectl create deploy ${DEPLOY_NAME} --image=${IMAGE_NAME}

test-deployed-docker:
	kubectl get deploy,rs,svc,pods
	POD_NAME=$(kubectl get pods -o name | grep $DEPLOY_NAME)
	kubectl port-forward ${POD_NAME} --address 0.0.0.0 8000:8000
	curl... in separate 