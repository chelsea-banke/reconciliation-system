const dotenv = require('dotenv')
const express = require('express')
const reconcileRouter = require('./src/controllers/reconcileController')

dotenv.config()
const server = express()
server.use('/', reconcileRouter)

server.listen(process.env.PORT, ()=>{
    console.log(`listening on port ${process.env.PORT}`)
})