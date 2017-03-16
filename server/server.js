let express = require('express')
let logger = require('morgan')
let bodyParser = require('body-parser')

let database = require('./app/database')
let routes = require('./app/routes')

const port = 300


let app = express()

app.set('strict routing', true)
app.set('etag', 'strong')
app.set('json spaces', 2)
app.set('port', port)
app.set('baseUrl', 'http://localhost:' + app.get('port'))

app.use(logger('common'))
app.use(bodyParser.json())

database.configure(app)
routes.configure(app)


app.listen(3000, () => {
  console.log('example app running on port 3000')
})
