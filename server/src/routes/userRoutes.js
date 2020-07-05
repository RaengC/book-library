const express = require('express')
const User = require('../models/User')
const Library = require('../models/Library')
const brcypt = require('bcryptjs')

const router = express.Router()

//Create new user 
router.post('/new', async (req, res) => {
    req.body.password = await brcypt.hash(req.body.password, 10)
    const data = await User.create(req.body)
    res.send(data)
})

//Login existing user
router.post('/login', async (req, res) => {
    // console.log(req.body)
    const user = await User.findOne({
        username: req.body.username
    })
    let status = 404
    let msg = "Try Again - Login Failed"

    if (user && await brcypt.compare(req.body.password, user.password)) {
        req.session.user = {
            username: user.username,
            id: user._id,
            loggedIn: true
        }
        status = 200;
        msg = "Logged In";
    }
    res.status(status).send(msg)
})

//Logout user
router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.send("Logged out")
    })
})

module.exports = router