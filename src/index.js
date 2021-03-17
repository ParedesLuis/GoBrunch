const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')

const Router = require('./network/router')

const { PORT } = require('./config')

const app = express()

app.set('view engine', 'ejs');

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use(express.static(path.join(__dirname,'public')))

Router(app)

app.listen(PORT,() => console.log(`Server on port: ${PORT}`))