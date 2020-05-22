const { app } = require('./app')


const server = app.listen(3000, () => {
    var host = server.address().address
    var port = server.address().port
    console.log("Le serveur écoute sur le port ", host, port)
})