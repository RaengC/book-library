const express = require('express')
const session = require('express-session')
require('./mongo')

const port = 3000

//Setup
const app = express()

//Routes
const userRouter = require('./routes/userRoutes')
const libraryRouter = require('./routes/libraryRoutes')
const bookRouter = require('./routes/bookRoutes')

//Middleware
app.use(express.json())
app.use(session({
    secret: 'green frogs live here',
    resave: false,
    saveUninitialized: true
}))

//Paths 
app.use('/user', userRouter)
app.use('/library', libraryRouter)
app.use('/book', bookRouter)

//Start Server
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))