# bclindner's website

This is a website written in node.js. You can usually find it at [bclindner.com](bclindner.com). It serves as a portfolio and professional blog, for the most part.

## Features

* Best practices: Uses a [style guide](https://standardjs.com/), a [well-maintained ORM](https://www.npmjs.com/package/sequelize), does unit tests with [a popular framework](http://mochajs.org/), etc.
* High-performance: most pages load in under a second at any reasonable connection, no cache, before images.
* Rudimentary blogging & portfolio management system: because WordPress and I don't get along.
  * TinyMCE for WYSIWYG blog post manipulation
  * Simple, easy-to-use UI and intuitive API system at frontend
  * Sequelize ORM interacting with PostgreSQL using simple, readable business code at backend
  * CRUD, REST, all those buzzwords


## Code structure

The site code is set up with the following structure:

* `config` folder: holds the configuration for Sequelize
* `migrations` folder: holds migrations for Sequelize (ignore this)
* `models` folder: holds the blogPosts and project object model
* `routes`folder: holds all express routes
* `sass` folder: holds uncompiled SASS code
* `static` folder: holds static content e.g. images, compiled SASS, downloadable files, etc.
* `views` folder: holds templates for all pages
* `gulpfile.js`: task automation scripts
* `index.js`: initial code

Keep this in mind when reading and working with this code.

## Sitemap

* `/` is the index page, and provides an introduction and recent blog posts.
* `/projects` is my portfolio - it provides all of my public projects and details.
  * `/projects/projectName` performs multiple functions:
    * *(requires authentication)* GETting the project gets the project from the DB and renders it.
    * *(requires authentication)* projecting the project updates the project with information given in the request.
    * *(requires authentication)* DELETE-ing the project removes the project from the database.
    * *(requires authentication)* PUTting the project creates a new project from the request data - this request fails if a project already exists.
    * `/projects/admin` provides a basic administrative interface, allowing posts to be controlled with the given APIs.
* `/downloads` provides a list of downloads and links to repositories, and is a static page.
* `/blog` provides an index of the blog system, and lists previews of the 10 most recent posts, with pagination to allow all posts to be viewed.
  * `/blog/post/postName` performs multiple functions:
    * *(requires authentication)* GETting the post gets the post from the DB and renders it.
    * *(requires authentication)* PUTting the post creates a new post from the request data - this request fails if a post already exists.
    * *(requires authentication)* DELETE-ing the post removes the post from the database.
    * *(requires authentication)* PUTting the post creates a new post - this request fails if a post already exists.
  * `blog/admin` provides a basic administrative interface, allowing posts to be controlled with the given APIs.
