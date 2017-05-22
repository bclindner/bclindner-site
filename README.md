# bclindner's website

This is a website written in node.js. You can usually find it at [bclindner.com](bclindner.com). It serves as a portfolio and professional blog, for the most part.

## Features

* Best practices: Uses a [style guide](https://standardjs.com/), a [well-maintained ORM](https://www.npmjs.com/package/sequelize), does unit tests with [a popular framework](http://mochajs.org/), etc.
* High-performance: most pages load in under a second at any reasonable connection, no cache, before images.
* Scalability: Cluster computing using the node [cluster](https://nodejs.org/api/cluster.html) library allows multicore usage
* Rudimentary blogging & portfolio management system: because WordPress and I don't get along.
  * TinyMCE for WYSIWYG blog post manipulation
  * Simple, easy-to-use UI and intuitive API system at frontend
  * Sequelize ORM interacting with PostgreSQL using simple, readable business code at backend
  * CRUD, REST, other best practices, all that jazz

## Installing and Using

This site requires a number of dependencies - use [Yarn](https://yarnpkg.com) to install them (just type `yarn` in the project directory).

Additionally, this site requires a PostgreSQL installation. This package is configured to use a local development server and use an environment variable in production - this can be changed in the config.json file.

Starting the server is as easy as typing `yarn start`, or `node index.js`.

## Code structure

The site code is set up with the following structure:

* `config` folder: holds the configuration for Sequelize
* `migrations` folder: holds migrations for Sequelize (ignore this)
* `models` folder: holds the blogPosts and project object model
* `routes`folder: holds all express routes
* `sass` folder: holds uncompiled SASS code
* `static` folder: holds static content e.g. images, compiled SASS, downloadable files, etc.
* `views` folder: holds templates for all pages
* `test` folder: holds unit tests for the site
* `gulpfile.js`: task automation scripts
* `index.js`: initial cluster code
* `server.js`: express app initialization & configuration; the app's "real" index.js

Keep this in mind when reading and working with this code.
