const express = require('express')
require('./mongo')

//Setup
const app = express()


const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))


//Start Server
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))