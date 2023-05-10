const express = require('express');
const router = express.Router();
const load = require('../services/reconcile/loadService');

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
    res.json(await load.byApi(req.params.id))
  } catch (error) {
    next(error)
  }
})

module.exports = router