const mongoose = require('mongoose')

const schema = new mongoose.Schema({

    // libraries: [{
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Library'
    // }],

    googleBookId: String,
    title: String,
    authors: [
        String
    ],
    description: String,
    imageLinks: {
        smallThumbnail: String,
        thumbnail: String
    }
})

module.exports = mongoose.model("Book", schema)