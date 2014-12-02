# Node App Framework
Forked from the [Style Guide project](https://github.com/technologyreview/node-app), this is a stripped down framework for hacking at HTTP API's with Node.js

## Content
Content templates are located under `/public/views/`, the **Elements** template uses `/public/views/index.twig`.

## Requirements
1. Home Brew (Mac): `ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"` then `brew doctor`
1. Node.js: `brew install node` or by downloading an installing from [Nodejs.com](http://www.nodejs.com)
1. Bower for client-side package management: `npm install -g bower`

## Installation (Mac)
1. Open up the command line and change to a directory where you want to install the app: `cd ~/Sites`
1. Clone the repo to your machine: `git clone git@github.com:technologyreview/node-app.git; cd node-app`
1. Install node packages: `npm install`
1. Run the `gulp` command to build the project. This will install package dependencies using `bower`, and then start the local server
1. Open the browser to `http://localhost:9999`

## Deployment
The production version of this style guide is hosted at [Heroku]() and has two environments that can be deployed to using Git, `staging` and `production`.

* **Development:** [localhost:9999](http://localhost:9999) - Served locally by Gulp + Nodemon
* **Staging:** [mittr-styleguide-staging.herokuapp.com](https://mittr-styleguide-staging.herokuapp.com/)
* **Production:** [mittr-styleguide.herokuapp.com](https://mittr-styleguide.herokuapp.com/)

To configure easy command-line deployment:

1. `cd` to the repo directory on your machine: `~/Sites/node-app`
1. Download and install the [Heroku Toolbelt](https://toolbelt.heroku.com/)
1. Login to Heroku: `heroku login` with email `Infrastructure@TechnologyReview.com` and password `techRev1w0293057*`
1. Add the `staging` remote to Git for deploying changes to the staging Heroku environment: `git remote add staging git@heroku.com:mittr-styleguide-staging.git`
1. Commit your changes, or merge them from another banch into master, and deploy them to Heroku staging: `git push staging master`
1. Add the `production` remote to Git for deploying changes to the production Heroku environment: `git remote add production git@heroku.com:mittr-styleguide.git`
1. Commit your changes, or merge them from another banch into master, and deploy them to Heroku production: `git push production master`

## Systems
More info on the tools and systems used.

* [Gulp](http://gulpjs.com/) is used to automate build and compile processes
* **Node.js** is used for generating a micro HTTP server that serves routes and server-side JavaScript
* [Express](http://expressjs.com/) is a Node web app framework used for MVC routing
* [Nodemon](http://nodemon.io/) will monitor for any changes in your node.js application and automatically restart the server
* LiveReload is loaded by Gulp, and is used to for injecting CSS updates into the browser when a `/public/less/*.less` file is saved