// server worker logic
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
// static routes (index, downloads)
require('./routes/static.js')(app)
// blog routes
require('./routes/blog.js')(app, models)
require('./routes/blogadmin.js')(app,models)
// TODO: project routes

// error routes
require('./routes/errors.js')(app)

console.log('starting server...')
// hand off app to module.exports for tests
module.exports = app.listen(port, () => {
  console.log('listening on port ' + port)
})
