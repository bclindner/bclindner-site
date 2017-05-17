var express = require('express')
var app = express()
var helmet = require('helmet')
var port = process.env.PORT || 8000

// express configuration
// use Helmet
app.use(helmet())
// use Pug
app.set('view engine', 'pug')
// static directory /static
app.use('/static',express.static('static'))

app.get('/', (req, res) => {
  res.render('main/index')
})

// activate listen server
app.listen(port, () => {
  console.log('listening on port ' + port)
})
