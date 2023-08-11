const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
const port = process.env.PORT
const routes = require('./routes/routes')


app.use(cors())
app.use(helmet())
app.use(morgan('tiny'))
app.use(bodyParser.json())

app.use('/api/v1', routes)


app.listen(port, ()=>{
    console.log(`Registration server running on port: ${port}`);
})