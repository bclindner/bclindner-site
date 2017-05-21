module.exports = function (app) {
  // 404 error
  app.use((req, res, next) => {
      res.status(404).render('error', {code: '404'})
  })
}
