# bclindner.com unfinished site design, 2017

This is an old unfinished site design I had scrapped. It was going to serve as a portfolio site and a custom blog that I could manage through my own admin page, but I decided the work necessary to design, develop, and maintain this would be more trouble than it's worth. The site is semi-functional, but I wouldn't deploy it to production as it is.

The site is a Dockerized node.js app with an nginx proxy which I'd for security, caching, SSL, etc., as well as a Postgres database being manipulated with [Sequelize](https://github.com/sequelize/sequelize) to handle blog content and other things.
