# Idea

- swear word classifier
- see list of swearwords here: https://www.digitalspy.com/tv/a809925/ofcom-swear-words-ranking-in-order-of-offensiveness/

## Structure

- backend
  - simply use flaskapi (a bit of an overkill, but hey...)
- frontend
  - simple page with a submit button
  - options
    - [python frameworks](https://blog.bitsrc.io/using-python-for-frontend-f90a0f8d51ae)
      - skulpt (3k stars)
      - ...
      - nothing really
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
    - pure JS
      - e.g. `fetch` [or similar](https://levelup.gitconnected.com/all-possible-ways-of-making-an-api-call-in-plain-javascript-c0dee3c11b8b)
      - [axios](https://github.com/axios/axios) (100k), a [slightly better `fetch`](<https://blog.logrocket.com/axios-vs-fetch-best-http-requests/#:~:text=To%20send%20data%2C%20fetch(),stringify%20method>)
    - call backend via [HTML form](https://stackoverflow.com/a/19933003/2135504) (how to display result?)

### Frontend

- use two sites
  - a form site
  - a "result" site
    - via [fastapi's HTMLResponse](https://fastapi.tiangolo.com/advanced/custom-response/)
    - via [pure JS](https://blog.teclado.com/how-to-interact-with-rest-apis-from-javascript/) (not yet sure how)
- single page sites
  - e.g. [react](https://reactjs.org/docs/forms.html)
