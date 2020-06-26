const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
// need a reference to the library

//.eachPath schemaType here or subdocument??? use []?

// schema.eachPath((Library, schematype) => {
//     username {} 
// })


module.exports = mongoose.model("User", schema)