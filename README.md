# bclindner's website

This is a website written in node.js. You can usually find it at [bclindner.com](bclindner.com). It serves as a portfolio and professional blog, for the most part.

## Features

* Best practices: Uses a [style guide](https://standardjs.com/), a [well-maintained ORM](https://www.npmjs.com/package/sequelize), is developed using [Docker](docker.com) for more consistent deployments, etc.
* High-performance: most pages load in under a second at any reasonable connection, no cache, before images.
* Scalability: Cluster computing using the node [cluster](https://nodejs.org/api/cluster.html) library allows multicore usage and scalability
* Rudimentary blogging & portfolio management system: because WordPress and I don't get along.
  * TinyMCE for WYSIWYG blog post manipulation
  * Simple, easy-to-use UI and intuitive API system at frontend
  * Sequelize ORM interacting with PostgreSQL using simple, readable business code at backend

## Using

This project uses Docker Compose to manage the Node project, an NGINX proxy server, and a PostgreSQL database server. To build and run this project, install Docker and Docker Compose (which usually comes with it), and run:

```sh
docker-compose up
```

This should build run the site - it will be available on localhost:80 when complete.

## Code structure

The site code is set up with the following structure:
* `app` folder: holds the main Node.js project, where most of the project's code is
  * `config` folder: holds the configuration for Sequelize
  * `migrations` folder: holds migrations for Sequelize (ignore this)
  * `models` folder: holds the blogPosts and project object model
  * `routes` folder: holds all express routes
  * `sass` folder: holds uncompiled SASS code
  * `static` folder: holds static content e.g. images, compiled SASS, downloadable files, etc.
  * `views` folder: holds templates for all pages
  * `test` folder: holds unit tests for the site
  * `gulpfile.js`: task automation scripts
  * `index.js`: initial cluster code
  * `server.js`: express app initialization & configuration; the app's "real" index.js
  * `Dockerfile`: configuration file to Dockerize this app
* `nginx` folder: holds the nginx reverse proxy server
  * `nginx.conf`: the custom config for the nginx server
  * `Dockerfile`: configuration file to Dockerize this app
* `docker-compose.yml`: the Docker Compose file for full-stack deployment of this program
* `README.md`: this file

Keep this in mind when reading and working with this code.
