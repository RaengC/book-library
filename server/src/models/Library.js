const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        ref: 'User',
        required: true
    },
    book: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Book'
    }]
})

//call google API from front end, store to back end. 
//Override default id with google API id
//userid/owner -- in post push the user id

//use group id[] or unique user[]


module.exports = mongoose.model("Library", schema)