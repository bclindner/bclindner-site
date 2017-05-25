module.exports = function (app) {
  // 404 error
  app.use((req, res, next) => {
    res.status(404).render('error', {code: '404'})
  })
  // 5xx error
  app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).render('error', {code: '500'})
  })
}
