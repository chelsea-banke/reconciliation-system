const csvtojson = require('convert-csv-to-json')
const loader = require("../services/loadService")
const express = require('express')
const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    res.send(await loader(req.body["partnerId"], req.body["sales"]))
  } catch (error) {
    next(error)
  }
})

router.post('/csv', async (req, res, next) => {
  try {
    res.send(await csvtojson.fieldDelimiter(',').getJsonFromCsv(req.body['path']), null, 2)
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