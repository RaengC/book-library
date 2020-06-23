const express = require('express')
const User = require('../models/User')
const brcypt = require('bcryptjs')
const router = express.Router()

//Create new user --> to ADD create default user Library on signup
router.post('/new', async (req, res) => {
    req.body.password = await brcypt.hash(req.body.password, 10)
    const data = await User.create(req.body)
    res.send(data)
})


module.exports = router