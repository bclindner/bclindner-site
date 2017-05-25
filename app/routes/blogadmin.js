var bodyParser = require('body-parser')
var passport = require('passport')

module.exports = function (app, models) {
  var post = models.blogpost
  // blog admin panel: use passport middleware
  // app.use(/\/blog\/admin.*/)
  // blog admin panel
  app.get('/blog/admin', (req, res) => {
    post.findAll({
      fields: ['title', 'slug'],
      order: [['createdAt', 'DESC']]
    }).then(posts => {
      res.render('blog/admin/index', {recentPosts: posts})
    })
  })
  // blog post creation form
  app.get('/blog/admin/create', (req, res) => {
    res.render('blog/admin/createPost')
  })
  // blog post submission
  app.post('/blog/admin/create', bodyParser.urlencoded({extended: false}), (req, res) => {
    post.create(req.body).then(() => {
      res.redirect('/blog/admin')
    })
  })
  app.get('/blog/admin/delete/:slug', (req, res) => {
    post.findOne({
      where: {
        slug: req.params.slug
      },
      fields: ['title', 'author']
    }).then((post) => {
      res.render('blog/admin/deletePost', {post: post})
    })
  })
  // blog post deletion
  app.post('/blog/admin/delete/:slug', (req, res) => {
    post.destroy({
      where: {
        slug: req.params.slug
      }
    }).then(() => {
      res.redirect('/blog/admin')
    })
  })
  // blog post update
  app.get('/blog/admin/update/:slug', (req, res) => {
    post.findOne({
      where: {
        slug: req.params.slug
      }
    }).then(post => {
      res.render('blog/admin/updatePost', {post: post})
    })
  })
  app.post('/blog/admin/update', bodyParser.urlencoded({extended: false}), (req, res) => {
    if (req.body.slug === '') { req.body.slug = req.body.oldslug }
    post.update(req.body, {
      where: {
        slug: req.body.oldslug
      }
    }).then(() => {
      res.redirect('/blog/post/' + req.body.slug)
    })
  })
}
