const express = require('express')
const session = require('express-session')
require('./mongo')


const port = 3000

//Setup
const app = express()

//Routes
const userRouter = require('./routes/userRoutes')

//Middleware
app.use(express.json())
app.use(session({
    secret: 'green frogs live here',
    resave: false,
    saveUninitialized: true
}))

//Paths 
app.use('/user', userRouter)


//Start Server
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))