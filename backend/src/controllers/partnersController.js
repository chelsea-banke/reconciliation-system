const express = require('express');
const router = express.Router();
const addNewPartner = require('../services/reconcile/addNewPartner')

router.post('/add-new', async (req, res, next) => {
    addNewPartner(req.body)
    res.send("ok")
})

module.exports = router