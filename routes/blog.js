var bodyParser = require('body-parser')
var dateFormat = require('dateformat')
var htmlTruncate = require('html-truncate')
module.exports = function (app, models) {
  var post = models.blogpost
  // blog landing page redirect
  app.get('/blog', (req, res) => {
    res.redirect('/blog/page/1')
  })

  // blog landing page
  app.get('/blog/page/:page', (req, res) => {
    var limit = 5
    var page = parseInt(req.params.page)
    var offset = (req.params.page - 1) * 5
    post.findAndCountAll({
      order: [['createdAt', 'DESC']],
      limit: limit,
      offset: offset,
      raw: true
    }).then(result => {
      var posts = result.rows
      var countNext = result.count - offset
      var countPrev = result.count - result.rows.length
      console.log(countNext + ' ' + countPrev)
      for (var i = 0; i < posts.length; i++) {
        // format date
        posts[i].createdAt = dateFormat(posts[i].createdAt, 'd mmmm yyyy')
        // truncate content
        posts[i].content = htmlTruncate(posts[i].content, 256)
      }
      res.render('blog/postlist', {
        posts: posts,
        next: countNext,
        prev: countPrev,
        page: page
      })
    })
  })

  // blog post view
  app.get('/blog/post/:slug', (req, res) => {
    post.findOne({
      where: {
        slug: req.params.slug
      },
      raw: true
    }).then(post => {
      post.createdAt = dateFormat(post.createdAt, 'd mmmm yyyy')
      res.render('blog/post', {post: post})
    })
  })

  // blog admin panel
  app.get('/blog/admin', (req, res) => {
    post.findAll({
      limit: 10,
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
      res.redirect('/blog/post/' + req.body.slug)
    })
  })
  // blog post deletion
  app.post('/blog/admin/delete', bodyParser.urlencoded({extended: false}), (req, res) => {
    post.destroy({
      where: {
        slug: req.body.slug
      }
    }).then(() => {
      res.redirect('/blog/admin')
    })
  })
  // blog post deletion confirm page
  app.get('/blog/admin/delete/:slug', (req, res) => {
    res.redirect('/blog/admin/deletePost', {slug: req.params.slug})
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
