const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    books: [{
        googleBookId: String,
        title: String,
        authors: [
            String
        ],
        description: String,
        imageLinks: {
            smallThumbnail: String,
            thumbnail: String
        },

        review: String
    }]
})

//call google API from front end, store to back end. 
//Override default id with google API id
//userid/owner -- in post push the user id

//use group id[] or unique user[]


module.exports = mongoose.model("Library", schema)