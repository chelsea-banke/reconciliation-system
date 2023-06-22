const dotenv = require('dotenv')
const express = require('express')
const cron = require("node-cron")
const bodyParser = require('body-parser')
const powernetLoad = require("./src/services/powernetLoadService")
const loadRouter = require('./src/controllers/loadController')
const reconRouter = require("./src/controllers/reconController")

dotenv.config()
const server = express()

server.use(express.json({ limit: '100mb' }));
server.use(express.urlencoded({ limit: '100mb', extended: true }));
server.use('/api/load', loadRouter)
server.use('/api/recon', reconRouter)


cron.schedule("57 13 * * *", ()=>{
    try{
        powernetLoad()
    } catch(error) {
        console.log("error", error)
    }
})


server.listen(process.env.PORT, ()=>{
    console.log(`listening on port ${process.env.PORT}`)
})