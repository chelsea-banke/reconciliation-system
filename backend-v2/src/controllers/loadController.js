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
      console.log(await generateExceptions(req.body["partnerId"], results["status"]["reconDate"]))
    })
  } catch (error) {
    next(error)
  }
})

router.get('/powernetSales', async (req, res, next)=>{
  try{
    res.send(await powernetLoad())
  } catch (error) {
    next(error)
  }
})

module.exports = router

















// csvtojson.fieldDelimiter(',').getJsonFromCsv('/home/chelsea/Downloads/ENEO PREPAY DU 21 au 24 04 2023_Express_Exchange.csv'), null, 2
// router.get('/sales/:id', async (req, res, next) => {
//   try {
//     await load.byApi(req.params.id)
//     res.send("done")
//   } catch (error) {
//     next(error)
//   }
// })

// router.post('/new-partner', async (req, res, next) => {
//   try {
//     addNewPartner(req.body)
//     res.send("ok")
//   } catch (error) {
//     next(error)
//   }
// })