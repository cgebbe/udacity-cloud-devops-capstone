# IMAGE USED IN CIRCLECI
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

lint-dockerfile:
	hadolint Dockerfile

DOCKER_NAME=ci_image
build-docker:
	docker build --progress=plain -t ${DOCKER_NAME} .

run-docker-locally:
	docker run --rm -it ${DOCKER_NAME}

DOCKER_REGISTRY=gebbissimo
DOCKER_VERSION=20221014-v1
IMAGE_NAME=${DOCKER_REGISTRY}/${DOCKER_NAME}:${DOCKER_VERSION}
push-docker:
	source .env
	docker login --username ${DOCKER_USERNAME} --password-stdin ${DOCKER_PASSWORD}
	docker tag ${DOCKER_NAME}:latest ${IMAGE_NAME}
	docker push ${IMAGE_NAME}



# REMOTE DEV SERVER
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
connect-to-remote-dev-server:
	ssh -vvv -i ~/Downloads/keep/my-key-pair.pem ubuntu@ec2-18-194-59-24.eu-central-1.compute.amazonaws.com
