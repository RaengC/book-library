const express = require('express')
const Book = require('../models/Book')
const Library = require('../models/Library')
// const User = require('../models/User')
const router = express.Router()

//add middleware
router.use((req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.status(401).send('Please login')
    }
})

//GET all
router.get('/', async (req, res) => {
    try {
        const data = await Book.find({})
        res.send(data)
    } catch {
        res.status(400).send("bad request")
    }
})

//Get by ID
router.get('/:id', async (req, res) => {
    try {
        const data = await Book.findById({
            _id: req.params.id
        })
        res.json(data)
    } catch {
        res.status(400).send("bad request")
    }
})

//GET all books by Library ID  (NOT SURE WHERE GOING WITH THIS..leave)
// router.get('/all/:libraryId', async (req, res) => {
//     try {
//         const data = await Book.find({
//             libaries: req.params.libraryId
//         })
//         console.log(data)
//         res.send(data)
//     } catch {
//         res.status(400).send("books not found")
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

/* 
    {
        bookID: String
        libraryID: String, 
    }
*/

//POST add library to book
router.post('/library/new', async (req, res) => {
    try {
        const book = await Book.findOne({
            _id: req.body.bookID
        })
        // console.log(book)
        const library = await Library.findOne({
            owner: req.session.user.id,
            _id: req.body.libraryID

        })
        // console.log(library)
        if (!library || !book) {
            res.status(404).send('comparison bad request')

        } else {
            console.log(book.library)
            book.libraries.push(library) //push into array
            const result = await book.save()
            res.json(result)
        }
    } catch (e) {
        console.log(e)
        res.status(400).send('bad request')
    }
})



//Delete book
router.delete('/delete/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        const data = await Book.findByIdAndDelete(req.params.id)
        res.json(data)
    } catch {
        res.status(400).send("bad request")
    }
})


module.exports = router