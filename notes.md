# TODO

- setup circleCI
  - credentials for aws
  - credentials for kubectl?!
- deploy backend
  - smoketest
  - get backend URL and store as variable SOMEHOW -> probably store in file
- deploy frontend
  - read from file
  - smoke test
- release

# DONE

- build CI image
- backend

  - lint apps using superlinter
  - built docker image
  - test docker image locally using curl
  - init aws ECR
  - push image to ECR
  - init aws EKS
  - deploy container to EKS
  - test via forwarding local port
  - create service
  - smoke test via realistic curl

- frontend
  - init s3 bucket
  - deploy to s3 bucket
  - smoke test (simple curl or wget)
  - init cloudfront
    - [setup cloudfront distribution](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-creating-console.html)
    - hmm.. at the moment still access denied :/
    - TODO: checkout with index.html at S3 root
    - [update cloudfront origin - WARNING: more difficult than expected](https://stackoverflow.com/questions/42624579/update-cloudfront-configuration-using-awscli)
    - -> maybe rather do cloudfront init and update via cloudformation?! No fear of deletion..
  - smoke test2
- makefiles could be split as such:
  - source code (install, lint, test, ...)
  - docker (build, push to ECR)
  - kubernetes (deployment, service, final test)

# Notes

- AWS cloudformation?
  - I could theoretically init those things using clouformation
    - s3 <-- really?
      - No, see .../2_infrastructure_as_code/README.md
      - > recommended to setup AWS RDS & S3 using console to avoid accidential deletion (when deleting a stack)
      - > If you really want to use cloudformation, specify DeletionPolicy: retain in the cloudformation script
  - backend
    - ECR
    - ~~EKR~~ <-- already via eksctl
  - frontend
    - S3
    - cloudfront

# Idea

- swear word classifier
- see list of swearwords here: https://www.digitalspy.com/tv/a809925/ofcom-swear-words-ranking-in-order-of-offensiveness/

## Structure

- backend
  - simply use flaskapi (a bit of an overkill, but hey...)
- frontend
  - simple page with a submit button
  - options
    - call backend via [HTML form](https://stackoverflow.com/a/19933003/2135504) (how to display result?)
    - pure JS
      - e.g. `fetch` [or similar](https://levelup.gitconnected.com/all-possible-ways-of-making-an-api-call-in-plain-javascript-c0dee3c11b8b)
      - [axios](https://github.com/axios/axios) (100k), a [slightly better `fetch`](<https://blog.logrocket.com/axios-vs-fetch-best-http-requests/#:~:text=To%20send%20data%2C%20fetch(),stringify%20method>)
    - [python frameworks](https://blog.bitsrc.io/using-python-for-frontend-f90a0f8d51ae)
      - skulpt (3k stars)
      - ...
      - nothing really?
      - as always, [streamlit](https://streamlit.io/) combined with `requests` library would work, see [example](https://betterprogramming.pub/how-to-make-http-requests-in-streamlit-app-f22a77fd1ed7)
      - [streamlit alternatives](https://stackshare.io/streamlit/alternatives) like dash,
    - [JS frameworks](https://www.ideamotive.co/blog/best-frontend-frameworks)
      - reactjs
      - angular
      - Vue (similar to Angular but simpler)
      - Svelte
      - [hyperapp](https://github.com/jorgebucaran/hyperapp) (18k)
    - CSS frameworks
      - bootstrap (160k) - also has JS
      - materialize (40k) - more opiniated than bootstrap
      - foundation (30k)
      - [skeleton](https://github.com/dhg/Skeleton) (20k) - just vanilla CSS
    - site generators?
      - [gatsby JS](https://github.com/gatsbyjs/gatsby) - based on react but maybe simpler?
      - React-static
      - ...

### Frontend

- use two sites
  - a form site
  - a "result" site
    - via [fastapi's HTMLResponse](https://fastapi.tiangolo.com/advanced/custom-response/)
    - via [pure JS](https://blog.teclado.com/how-to-interact-with-rest-apis-from-javascript/) (not yet sure how)
- single page sites
  - e.g. [react](https://reactjs.org/docs/forms.html)

--> Okay, works with pure JS, but next time either...

- use only fastapi and the HTML template (maybe a dummy index frontend page for forwarding)
- use streamlit
