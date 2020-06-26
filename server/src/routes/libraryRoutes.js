const express = require('express')
const Library = require('../models/Library')
const router = express.Router()

//middleware??

//Get all items -- these will be items saved from Google Books API, need to add new ID
router.get('/', async (req, res) => {
    const data = await Library.find({})
    //console.log("library get all working?")
    res.send(data)
})

//Get book by ID (linked from original google ID)
router.get('/:id', async (req, res) => {
    const data = await Library.findOne({
        _id: req.params.id
    })
})

//create new library
router.post('/new', async (req, res) => {
    const findLibrary = await Library.findOne({ //might findOneAndUpdate here??
        user: req.session.user.id
    })
    if (findLibrary) {
        console.log("find library", findLibrary)
        const newBooks = findLibrary.books
        newBooks.push(req.body)
        const updateData = {
            user: req.session.user.id,
            books: newBooks
        }
        const update = await Library.findByIdAndUpdate({
            _id: findLibrary._id
        }, updateData, {
            new: true
        })
        res.status(200).send(update)
    } else {
        const mongoData = {
            user: req.session.user.id, //link to userRoutes login route session
            books: [
                req.body //this array has one object ->coming from JSON in postman
            ]
        }
        const data = await Library.create(mongoData)
        console.log("created", data)
        if (data) {
            res.send(data)
        }
    }
})


//Update library name?
router.patch('/update')


module.exports = router