FROM circleci/python:3.10.1

# Base image already includes:
# - pgrep, pkill, sed (ubuntu base)
# - make, curl, unzip
# - docker, python3, python3-pip, python3-venv
# - git

WORKDIR /home/circleci
RUN whoami
RUN pwd

# prevent interactive installation from tzdata when installing git-all
ENV DEBIAN_FRONTEND=noninteractive
RUN sudo apt-get update
RUN sudo apt-get -y install dnsutils
RUN sudo apt-get -y --no-install-recommends install git-lfs

# aws-cli
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
    && unzip awscliv2.zip \
    && sudo ./aws/install \
    && rm -rf ./aws/

# kubectl 1.22 (check version from cluster)
RUN curl -o kubectl https://s3.us-west-2.amazonaws.com/amazon-eks/1.22.6/2022-03-09/bin/linux/amd64/kubectl \
    && chmod +x ./kubectl \
    && mkdir -p $HOME/bin \
    && cp ./kubectl $HOME/bin/kubectl && export PATH=$PATH:$HOME/bin \
    && echo 'export PATH=$PATH:$HOME/bin' >> ~/.bashrc \
    && kubectl version --short --client
