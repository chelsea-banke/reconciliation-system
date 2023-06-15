const dotenv = require('dotenv')
const express = require('express')
const bodyParser = require('body-parser')

dotenv.config()
const server = express()
server.use(bodyParser.json())

server.listen(process.env.PORT, ()=>{
    console.log(`listening on port ${process.env.PORT}`)
})