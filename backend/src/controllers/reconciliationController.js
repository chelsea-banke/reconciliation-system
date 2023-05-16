const express = require('express')
const router = express.Router()
const generatePowernetExceptions = require('../services/exception/generatePowernetExceptions')
const generatePartnerExceptions = require('../services/exception/generatePartnerExceptions')

router.get('/', async (req, res, next) => {
  try {
    res.send(await generatePartnerExceptions.byToken())
  } catch (error) {
    next(error)
  }
})

module.exports = router