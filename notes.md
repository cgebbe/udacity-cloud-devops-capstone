# TODO

- lint apps using superlinter
- dockerize backend app (should be really simple) and run test (curl inside docker?)
- create aws infrastructure
  - amazon container registry
  - k8s via eksctl -- manually upfront?
  - s3 bucket -- manually
- deploy backend to k8s using kubectl -- get URL!
- deploy frontend to s3 using new backend URL
- smoketests (curl)
- simply do manually(?)
  - use new fronend by updating aws cloudfront (content delivery network)
  - delete old s3 prefix
  - delete old k8s pod?!

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
