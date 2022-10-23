# Udacity cloud devops capstone project

## About

This is a minimal web-app for detecting swear words (see screenshot below) with a quasi production like DevOps pipeline.

![](README.assets/2022-10-24-00-00-27.png)

The backend uses fastapi and a uvicorn server. It is packaged as a docker container and pushed to an AWS ECR. Finally, the docker is deployed and exposed to a kubeflow cluster using AWS EKS.

The frontend consists of a simple HTML and JS file. It calls the backend in the client browser via a simple `fetch` call. It is deployed to an AWS S3 bucket and can be accessed via AWS Cloudfront.

The CI deploys both the backend and the frontend. If all tests pass, it is released via a Blue/Green deployment by simply replacing a forwarding `index.html` file in the S3 bucket and by subsequently invalidating the Cloudfront cache.

## CI screenshot

Note the CircleCI workflow ID `8fb828f1-1e60-47f1-a737-f94814536148` in the screenshot which corresponds to the output of `curl --fail d35lip4c5u1vnb.cloudfront.net`:

```bash
>>> curl --fail d35lip4c5u1vnb.cloudfront.net
<meta http-equiv="Refresh" content="3; url='8fb828f1-1e60-47f1-a737-f94814536148/index.html'" />

Waiting for redirection...
```

![](README.assets/2022-10-24-00-34-22.png)

## Submission criteria

- Setup pipeline
  - Create Github repository with project code.
    - All project code is stored in a GitHub repository and a link to the repository has - been provided for reviewers.
  - Use image repository to store Docker images
    - The project uses a centralized image repository to manage images built in the - project. After a clean build, images are pushed to the repository.
- Build docker container
  - Execute linting step in code pipeline
    - Code is checked against a linter as part of a Continuous Integration step (demonstrated w/ two screenshots)
  - Build a Docker container in a pipeline
    - The project takes a Dockerfile and creates a Docker container in the pipeline.
- Deployment
  - The Docker container is deployed to a Kubernetes cluster
    - The cluster is deployed with CloudFormation or Ansible. This should be in the source code of the student’s submission.
      - **Note to reviewer:** As the makefile indicates, I used [eksctl](https://github.com/weaveworks/eksctl), which is built on top of Cloudformation.
  - Use Blue/Green Deployment or a Rolling Deployment successfully
    - The project performs the correct steps to do a blue/green or a rolling deployment into the environment selected. Student demonstrates the successful completion of chosen deployment methodology with screenshots.
