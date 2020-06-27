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
        }).populate('items')
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
        res.json(library)
    } catch {
        res.status(400).status('bad request')
    }
})

/* 
    {
        libraryID: String, 
        bookID: String
    }
*/
//Add book to library
router.post('/book/add', async (req, res) => {
    try {
        const library = await Library.findOne({
            owner: req.session.user.id,
            _id: req.body.libraryID,
        })
        // console.log(library)
        const book = await Book.findOne({
            _id: req.body.bookID
        })
        // console.log(book)
        if (!library || !book) {
            res.status(404).send('bad request')
        } else {
            // console.log(library.book)
            library.book.push(book) //push for array
            const result = await library.save()
            res.json(result)
        }
    } catch {
        res.status(400).send('bad request')
    }
})

/*   
    {
        libraryID: String, 
        bookID: String
    }
*/
//Delete Book from Library
router.patch('/book/remove', async (req, res) => {
    try {
        const library = await Library.findOne({
            owner: req.session.user.id,
            _id: req.body.libraryID
        }).populate('book')
        // console.log(library)

        //filter out book with matching ID
        library.book = library.book.filter((book) => {
            return book.id !== req.body.bookID
        })
        const result = await library.save()
        res.json(result)
    } catch (e) {
        console.log(e)
        res.status(400).send('bad request')
    }
})

//Update library name


//Delete Library





//ORIGINAL WITH HARDCODED LINK TO ID IN MODEL
//create new library (this one attached to user ID)

// router.post('/new', async (req, res) => {
//     const findLibrary = await Library.findOne({ //might findOneAndUpdate here??
//         user: req.session.user.id
//     })
//     if (findLibrary) {
//         console.log("find library", findLibrary)
//         const newBooks = findLibrary.books
//         newBooks.push(req.body)
//         const updateData = {
//             user: req.session.user.id,
//             books: newBooks
//         }
//         const update = await Library.findByIdAndUpdate({
//             _id: findLibrary._id
//         }, updateData, {
//             new: true
//         })
//         res.status(200).send(update)
//     } else {
//         const mongoData = {
//             user: req.session.user.id, //link to userRoutes login route session
//             books: [
//                 req.body //this array has one object ->coming from JSON in postman
//             ]
//         }
//         const data = await Library.create(mongoData)
//         console.log("created", data)
//         if (data) {
//             res.send(data)
//         }
//     }
// })


// })


module.exports = router