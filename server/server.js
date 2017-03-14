let express = require('express')
let logger = require('morgan')
let bodyParser = require('body-parser')

let database = require('./database')
let routes = require('./routes')


let app = express()

app.set('strict routing', true)
app.set('etag', 'strong')

app.use(logger('common'))
app.use(bodyParser.json())

database.configure(app)
routes.configure(app)


app.listen(3000, () => {
  console.log('example app running on port 3000')
})
