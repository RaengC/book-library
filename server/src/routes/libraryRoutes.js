const express = require('express')
const Library = require('../models/Library')
const Book = require('../models/Book')
const User = require('../models/User')
const mongoose = require('mongoose')

const router = express.Router()

//middleware 
router.use((req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.status(401).send('Please login')
    }
})

//Get all Libraries
router.get('/', async (req, res) => {
    try {
        const library = await Library.find({
            owner: req.session.user.id
        }).populate('book')
        res.json(library)
    } catch {
        res.status(400).send("bad request")
    }
})

//Create new Library
router.post('/new', async (req, res) => {
    req.body.owner = req.session.user.id
    try {
        const library = await Library.create(req.body)
        res.send(library)
    } catch {
        res.status(400).status('bad request')
    }
})

//ADD NEW BOOK TO LIBRARY
router.post('/addnewbook', async (req, res) => {
    const findLibrary = await Library.findOne({
        owner: req.session.user.id
    })
    if (findLibrary) {
        console.log("find library", findLibrary)
        // const newBooks = findLibrary.books
        const book = await Book.create(
            req.body
        )
        findLibrary.book.push(book)
        await findLibrary.save()

        res.status(200).send(findLibrary)
    } else {
        const mongoData = {
            user: req.session.user.id,
            books: [
                req.body
            ]
        }
        res.send('error')
    }
})


module.exports = router