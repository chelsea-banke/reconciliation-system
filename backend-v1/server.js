const dotenv = require('dotenv')
const express = require('express')
const bodyParser = require('body-parser')
const loadRouter = require('./src/controllers/loadController')
const reconcileSales = require('./src/controllers/reconciliationController')

dotenv.config()
const server = express()
server.use(bodyParser.json())

server.use('/api/load', loadRouter)
server.use('/api/reconcile', reconcileSales)

server.listen(process.env.PORT, ()=>{
    console.log(`listening on port ${process.env.PORT}`)
})