const mongoose = require('mongoose')

const schema = new mongoose.Schema({

    bookID: String,
    title: String,
    authors: [
        String
    ],
    description: String,
    imageLinks: {
        smallThumbnail: String,
        thumbnail: String
    },

    // libraries: [{
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Library'
    // }]
})

module.exports = mongoose.model("Book", schema)