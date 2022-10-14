# jammy is 22.04 LTS
# Alternative base image: https://hub.docker.com/r/circleci/python
FROM ubuntu:jammy-20221003

WORKDIR /opt

# pgrep -> already
# pkill -> already
# sed -> already
# nslookup -> dnsutils
# dig -> dnsutils
RUN apt-get update
RUN apt-get install -y make=4.3-4.1build1
RUN apt-get install -y curl=7.81.0-1ubuntu1.4
RUN apt-get install -y dnsutils=1:9.18.1-1ubuntu1.2
RUN apt-get install -y --no-install-recommends docker=1.5-2
RUN apt-get install -y --no-install-recommends python3=3.10.6-1~22.04
RUN apt-get install -y --no-install-recommends python3-pip

# aws-cli
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
    && unzip awscliv2.zip \
    && ./aws/install \
    && rm -rf ./aws/

# kubectl 1.22 (check version from cluster)
RUN curl -o kubectl https://s3.us-west-2.amazonaws.com/amazon-eks/1.22.6/2022-03-09/bin/linux/amd64/kubectl \
    && chmod +x ./kubectl \
    && mkdir -p $HOME/bin \
    && cp ./kubectl $HOME/bin/kubectl && export PATH=$PATH:$HOME/bin \
    && echo 'export PATH=$PATH:$HOME/bin' >> ~/.bashrc \
    && kubectl version --short --client
