const express = require('express')
const Book = require('../models/Book')
const Library = require('../models/Library')
const router = express.Router()

// middleware
router.use((req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.status(401).send('Please login')
    }
})

//GET all
// router.get('/', async (req, res) => {
//     try {
//         const data = await Book.find({})
//         res.send(data)
//     } catch {
//         res.status(400).send("bad request")
//     }
// })

//Get by ID
// router.get('/:id', async (req, res) => {
//     try {
//         const data = await Book.findById({
//             _id: req.params.id
//         })
//         res.json(data)
//     } catch {
//         res.status(400).send("bad request")
//     }
// })

//POST add new book
router.post('/new', async (req, res) => {
    try {
        const data = await Book.create(req.body)
        res.json(data)
    } catch {
        res.status(400).send("bad request")
    }
})

//Delete book
// router.delete('/delete/:id', async (req, res) => {
//     try {
//         console.log(req.params.id)
//         const data = await Book.findByIdAndDelete(req.params.id)
//         res.json(data)
//     } catch {
//         res.status(400).send("bad request")
//     }
// })


module.exports = router