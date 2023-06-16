const dotenv = require('dotenv')
const express = require('express')
const bodyParser = require('body-parser')
const loadRouter = require('./src/controllers/loadController')

dotenv.config()
const server = express()

server.use(express.json({ limit: '100mb' }));
server.use(express.urlencoded({ limit: '100mb', extended: true }));
server.use('/api/load', loadRouter)

server.listen(process.env.PORT, ()=>{
    console.log(`listening on port ${process.env.PORT}`)
})