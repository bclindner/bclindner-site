module.exports = function (app) {
  app.get('/', (req, res) => {
    res.render('main/index')
  })
  app.get('/downloads', (req,res) => {
    res.render('main/downloads')
  })
}
