var bodyParser = require('body-parser')
module.exports = function (app, models) {
  var post = models.blogpost
  // blog landing page redirect
  app.get('/blog', (req, res) => {
    res.redirect('/blog/page/1')
  })

  // blog landing page
  app.get('/blog/page/:page', (req, res) => {
    post.findAll({
      limit: 10,
      offset: (parseInt(req.params.page) - 1) * 10
    }).then(posts => {
      res.render('blog/postlist', {posts: posts})
    })
  })

  // blog post view
  app.get('/blog/post/:slug', (req, res) => {
    post.findOne({
      where: {
        slug: req.params.slug
      }
    }).then(post => {
      res.render('blog/post', {post: post})
    })
  })

  // blog admin panel
  app.get('/blog/admin', (req, res) => {
    post.findAll({
      limit: 5
    }).then(posts => {
      res.render('blog/admin/index', {recentPosts: posts})
    })
  })
  // blog post creation form
  app.get('/blog/admin/create', (req, res) => {
    res.render('blog/admin/createPost')
  })
  // blog post submission
  app.post('/blog/admin/create', bodyParser.urlencoded(), (req, res) => {
    post.create(req.body).then(() => {
      res.redirect('/blog/post/' + req.body.slug)
    })
  })
}
