# LOCAL
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
fix-versions:
	pip-compile --extra=dev -o requirements-dev.txt pyproject.toml
	pip-compile -o requirements.txt pyproject.toml

install:
	. venv/bin/activate && pip install -r requirements-dev.txt

run-locally:
	. venv/bin/activate && uvicorn main:app --host 0.0.0.0

curl-localhost:
	curl --fail -X 'POST' \
	 'http://localhost:8000/swearword' \
	 -H 'accept: application/json' \
	 -H 'Content-Type: application/json' \
	 -d '{"sentence": "you wanker!"}'

lint:
	. venv/bin/activate && pre-commit run --all-files

# DOCKER
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# https://docs.aws.amazon.com/cli/latest/reference/ecr/create-repository.html
# https://docs.aws.amazon.com/cli/latest/reference/ecr-public/create-repository.html
# The udacity user cannot create a public repository.
ECR_NAME=958160457995.dkr.ecr.us-east-1.amazonaws.com
init-docker-registry:
	aws ecr create-repository --repository-name capstone

DOCKER_NAME=capstone-backend
build-docker:
	docker build -t ${DOCKER_NAME} .

run-docker-locally:
	docker run -p 8000:8000 ${DOCKER_NAME}

DOCKER_VERSION=geb-20221005-v1
IMAGE_NAME=${ECR_NAME}/${DOCKER_NAME}:${DOCKER_VERSION}
push-docker:
	aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${ECR_NAME}
	docker tag ${DOCKER_NAME}:latest ${IMAGE_NAME}
	docker push ${IMAGE_NAME}

# KUBE POD
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
init-kube-cluster:
	eksctl create cluster --name capstone --region us-east-1 --node-type t3.micro
	kubectl get nodes

destroy-kube-cluster:
	eksctl delete cluster --name capstone

DEPLOY_NAME=${DOCKER_NAME}-${DOCKER_VERSION}
create-kube-deployment:
	kubectl create deployment ${DEPLOY_NAME} --image=${IMAGE_NAME} --port 8000
	kubectl get deploy,pods

delete-kube-deployment:
	kubectl delete deployment ${DEPLOY_NAME}

# For defining variables in Makefile targets, see https://stackoverflow.com/a/1909390/2135504
forward-local-port-to-pod:
	$(eval POD_NAME=$(shell kubectl get pods -o name | grep ${DEPLOY_NAME}))
	echo ${POD_NAME}
	kubectl port-forward $(POD_NAME) --address 0.0.0.0 8000:8000 &

kill-port-forwarding:
	pgrep kubectl
	pkill kubectl

# KUBE SERVICE
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
expose-deployment:
	kubectl expose deployment ${DEPLOY_NAME} --type=LoadBalancer
	kubectl describe services ${DEPLOY_NAME}

delete-service:
	kubectl delete service ${DEPLOY_NAME}

curl-service:
	$(eval IP_ADDRESS=$(shell kubectl get services ${DEPLOY_NAME} -o json | jq -r '.status.loadBalancer.ingress[0].hostname'))
	
	echo ${IP_ADDRESS}
	nslookup ${IP_ADDRESS}
	# dig ${IP_ADDRESS}

	curl --fail -X 'POST' \
		"http://${IP_ADDRESS}:8000/swearword" \
		-H 'accept: application/json' \
		-H 'Content-Type: application/json' \
		-d '{"sentence": "you wanker!"}'

# created exposure at ~22:42
# read at 22:46 --> probably need to wait for 5-10min until curling