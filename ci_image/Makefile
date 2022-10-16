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
DOCKER_VERSION=20221016-v3
IMAGE_NAME=${DOCKER_REGISTRY}/${DOCKER_NAME}:${DOCKER_VERSION}
push-docker:
	@# sourcing .env does not work, see https://stackoverflow.com/a/16490872/2135504
	@# simply export variables in your parent shell.
	echo "${DOCKER_PASSWORD}" | docker login --username ${DOCKER_USERNAME} --password-stdin
	docker tag ${DOCKER_NAME}:latest ${IMAGE_NAME}
	docker push ${IMAGE_NAME}



# REMOTE DEV SERVER
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
connect-to-remote-dev-server:
	ssh -vvv -i ~/Downloads/keep/my-key-pair.pem ubuntu@ec2-18-194-59-24.eu-central-1.compute.amazonaws.com
