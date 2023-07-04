const runQuery = require("../../src/utils/runQuery")
const recon = require("../services/generateExceptions")
const resolveExceptions = require("../services/resolveExceptions")

const express = require('express')
const router = express.Router()

router.post('/getStatus', async(req, res, next)=>{
    try{
        res.send({
            "status": (await runQuery('SELECT * FROM ReconStatus WHERE Recon_ID = ?', req.body["reconId"]))[0][0],
            // "exceptionSales": (await runQuery('SELECT * FROM Exceptions WHERE Recon_ID = ?', req.body["reconId"]))[0]
        })
    } catch(error){

    } finally{
        next()
    }
})

router.post('/generateExceptions', async(req, res, next)=>{
    try{
        res.send(await recon(req.body["partnerId"], req.body["reconDate"]))
    } catch(error){
        console.log("error", error)
    } finally{
        next()
    }
})

router.get('/resolvePowernet', async(req, res, next)=>{
    try{
        res.send(await resolveExceptions())
    } catch(error){
        console.log("error", error)
    } finally{
        next()
    }
})
module.exports = router