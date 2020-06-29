const mongoose = require('mongoose')

const schema = new mongoose.Schema({

    _id: String,
    title: String,
    authors: [
        String
    ],
    description: String,
    imageLinks: {
        smallThumbnail: String,
        thumbnail: String
    },

    libraries: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Library'
    }]
})

module.exports = mongoose.model("Book", schema)