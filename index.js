var express = require('express')
var app = express()
var helmet = require('helmet')
var port = process.env.PORT || 8000
var models = require('./models')
var compression = require('compression')

// express configuration
// use Helmet
app.use(helmet())
// use compression
app.use(compression())
// use Pug
app.set('view engine', 'pug')
// static directory /static
app.use('/static', express.static('static'))

require('./routes/static.js')(app)
require('./routes/blog.js')(app, models)

// sync the database then activate the server
console.log('syncing database...')
models.sequelize.sync().then(() => {
  console.log('starting server...')
  app.listen(port, () => {
    console.log('listening on port ' + port)
  })
})
