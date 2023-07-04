const csvtojson = require('convert-csv-to-json')
const partnerLoad = require("../services/partnerLoadService")
const powernetLoad = require("../services/powernetLoadService")
const generateExceptions = require("../services/generateExceptions")
const express = require('express')
const router = express.Router()

router.post('/partnerSales', async (req, res, next) => {
  try {
    const results = await partnerLoad(req.body["partnerId"], req.body["sales"])
    res.send(results)
    res.on("finish", async()=>{
      await generateExceptions(req.body["partnerId"], results["status"]["reconDate"])
    })
  } catch (error) {
    next(error)
  }
})

router.post('/powernetSales', async (req, res, next)=>{
  try{
    const count = await powernetLoad(req.body["url"])
    res.send({
      "powernetSalesCount": count
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
// (await runQuery(`SELECT * FROM PartnerPPSales WHERE Recon_ID = ?`, [results["status"]["reconId"]]))[0].length >= (results["status"]["salesCount"] - results["status"]["duplicateSalesCount"])