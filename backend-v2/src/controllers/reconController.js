const runQuery = require("../../src/utils/runQuery")

const express = require('express')
const router = express.Router()

router.post('/getStatus', async(req, res, next)=>{
    try{
        res.send({
            "status": (await runQuery('SELECT * FROM ReconStatus WHERE Recon_ID = ?', req.body["reconId"]))[0],
            "exceptionSales": (await runQuery('SELECT * FROM Exceptions WHERE Recon_ID = ?', req.body["reconId"]))[0]
        })
    } catch(error){

    } finally{
        next()
    }
})

module.exports = router