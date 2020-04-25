const express = require('express')
const bodyParser = require('body-parser')

const usersRouter = require('./routes/users_route')
const usersModel = require('./model/users')

const app = express()

app.use(bodyParser.json())
app.use('/v1/users', usersRouter(usersModel))

server = app.listen(3000, () => {
    const host = server.address().address
    const port = server.address().port
    console.log("le server écoute sur le port", host, port)
})