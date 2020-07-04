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

//GET list all books associated with this library. *******
// router.get('/contents', async (req, res) => {
//     try {
//         const library = await Library.findOne({
//             owner: req.session.user.id,
//             _id: req.body.libraryID,
//         })
//         const book = await Book.find({
//             _id: req.body.bookID
//         }).populate('books')
//         res.json(book)
//     } catch {
//         res.status(400).send("bad request")
//     }
// })


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


/*   
    {
        libraryID: String, 
        bookID: String
    }
*/
//Delete Book from Library
// router.patch('/book/remove', async (req, res) => {
//     try {
//         const library = await Library.findOne({
//             owner: req.session.user.id,
//             _id: req.body.libraryID
//         }).populate('book')
//         // console.log(library)

//         //filter out book with matching ID
//         library.book = library.book.filter((book) => {
//             return book.id !== req.body.bookID
//         })
//         const result = await library.save()
//         res.json(result)
//     } catch (e) {
//         console.log(e)
//         res.status(400).send('bad request')
//     }
// })

//Update library name


//Delete Library
// router.delete('/delete/:id', async (req, res) => {
//     try {
//         const data = await Library.findByIdAndDelete(req.params.id, req.body, {
//             new: true
//         })
//         res.json(data)
//     }
// })



//ADD book to library 4/7/2020
router.post('/addbook', async (req, res) => {
    const findLibrary = await Library.findOne({
        owner: req.session.user.id
    })
    if (findLibrary) {
        console.log("find library", findLibrary)
        // const newBooks = findLibrary.books
        const book = await Book.findById(
            req.body.bookID
        )
        findLibrary.book.push(book)
        await findLibrary.save()
        // const updateData = {
        //     user: req.session.user.id,
        //     books: newBooks
        // }
        // const update = await Library.findByIdAndUpdate({
        //     _id: findLibrary._id
        // }, updateData, {
        //     new: true
        // })
        res.status(200).send(findLibrary)
    } else {
        const mongoData = {
            user: req.session.user.id, //link to userRoutes login route session
            books: [
                req.body //this array has one object ->coming from JSON in postman
            ]
        }
        res.send('error')
        // const data = await Library.create(mongoData)
        // console.log("created", data)
        // if (data) {
        //     res.send(data)
        // }
    }
})


module.exports = router