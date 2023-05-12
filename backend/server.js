const dotenv = require('dotenv')
const express = require('express')
const bodyParser = require('body-parser')
const reconcileRouter = require('./src/controllers/reconcileController')

dotenv.config()
const server = express()
server.use(bodyParser.json());
server.use('/load', reconcileRouter)
server.listen(process.env.PORT, ()=>{
    console.log(`listening on port ${process.env.PORT}`)
})