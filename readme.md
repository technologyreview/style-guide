# MIT Technology Review Web Style Guide
Guidelines to help you align a microsite, partner website, or other affiliate content served to an audience under the MIT brand.

## Content
Content templates are located under `/public/views/`, the **Elements** template uses `/public/views/index.twig`.

## Installation (Mac)
1. Clone the repo to your machine
1. Install Home Brew: `ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"` then `brew doctor`
1. Install Node.js: `brew install node`
1. `cd` to the repo directory and run `npm install` to install all package dependencies
1. Run the `gulp` command to start the server
1. Open the browser to `http://localhost:9999`

## Development notes
* [Gulp](http://gulpjs.com/) is used to automate build and compile processes
* **Node.js** is used for generating a micro HTTP server that serves routes and server-side JavaScript
* [Express](http://expressjs.com/) is a Node web app framework used for MVC routing
* [Nodemon](http://nodemon.io/) will monitor for any changes in your node.js application and automatically restart the server
* LiveReload
