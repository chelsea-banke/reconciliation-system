const express = require('express')
const router = express.Router()
const load = require('../services/reconcile/loadService')
const addNewPartner = require('../services/reconcile/addNewPartner')

router.get('/', async (req, res, next) => {
  try {
    await load.byApi()
    res.send('success')
  } catch (error) {
    next(error)
  }
})
router.get('/:id', async (req, res, next) => {
  try {
    await load.byApi(req.params.id)
    // await reconcile.byToken(req.params.id)
    res.send('done')
  } catch (error) {
    next(error)
  }
})

router.post('/new-partner', async (req, res, next) => {
  try {
    addNewPartner(req.body)
    res.send("ok")
  } catch (error) {
    next(error)
  }
})

module.exports = router