var dateFormat = require('dateformat')
var htmlTruncate = require('html-truncate')
module.exports = function (app, models) {
  var post = models.blogpost
  // blog landing page redirect
  app.get('/blog', (req, res) => {
    res.redirect('/blog/page/1')
  })

  // /blog/page/X (blog landing page)
  app.get('/blog/page/:page', (req, res) => {
    var limit = 10
    var page = parseInt(req.params.page)
    if (page <= 0) {
      res.redirect('/blog/page/1')
    }
    var offset = (req.params.page - 1) * limit
    post.findAndCountAll({
      order: [['createdAt', 'DESC']],
      limit: limit,
      offset: offset,
      raw: true
    }).then(result => {
      var posts = result.rows
      var countNext = result.count - offset - result.rows.length
      for (var i = 0; i < posts.length; i++) {
        // format date
        posts[i].createdAt = dateFormat(posts[i].createdAt, 'd mmmm yyyy')
        // truncate content
        posts[i].content = htmlTruncate(posts[i].content, 256)
      }
      res.render('blog/postlist', {
        posts: posts,
        count: result.count,
        next: countNext,
        page: page
      })
    }).catch((err) => {
      console.log(err)
      res.status(500).render('error', {code: 500})
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
      res.render('blog/viewpost', {post: post})
    }).catch((err) => {
      res.status(500).render('error', {code: 500})
    })
  })
}
