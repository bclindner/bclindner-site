var express = require('express')
var app = express()
var helmet = require('helmet')
var port = process.env.PORT || 8000
var models = require('./models')

// express configuration
// use Helmet
app.use(helmet())
// use Pug
app.set('view engine', 'pug')
// static directory /static
app.use('/static', express.static('static'))

app.get('/', (req, res) => {
  res.render('main/index')
})

// sync the database then activate the server
models.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log('listening on port ' + port)
  })
})
