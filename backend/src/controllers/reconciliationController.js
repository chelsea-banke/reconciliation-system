const express = require('express')
const router = express.Router()
const generatePowernetExceptions = require('../services/exception/generatePowernetExceptions')
const generatePartnerExceptions = require('../services/exception/generatePartnerExceptions')

router.post('/', async (req, res, next) => {
  try {
    const date = new Date(req.body["date"])
    res.send({
      "partnerByToken": (await generatePartnerExceptions.byToken(date))[0],
      "powerNetByToken": (await generatePowernetExceptions.byToken(date))[0],
      "powerNetByAlt": (await generatePowernetExceptions.byAlt(date))[0]
    })
  }
  catch (error) {
    next(error)
  }
})

module.exports = router