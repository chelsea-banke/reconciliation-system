const express = require('express');
const router = express.Router();
const load = require('../services/reconcile/loadService');
const reconcile = require('../services/reconcile/reconcileService')

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

module.exports = router