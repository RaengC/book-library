const express = require('express')
const User = require('../models/User')
const brcypt = require('bcryptjs')
const {
    urlencoded
} = require('express')
const router = express.Router()

//Create new user 
router.post('/new', async (req, res) => {
    req.body.password = await brcypt.hash(req.body.password, 10)
    const data = await User.create(req.body)
    res.send(data)

    //--> to ADD create default user Library on signup
})

//Login existing user
router.post('/login', async (req, res) => {
    const user = await User.findOne({
        username: req.body.username
    })
    let status = 404
    let msg = "Try Again - Login Failed"

    if (user && await brcypt.compare(req.body.password, user.password)) {
        status = 200,
            msg = "Logged In"
    }
    res.status(status).send(msg)
})

//Logout user (middlewear added to index.js)
router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.send("Logged out")
    })
})


module.exports = router