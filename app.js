var express = require("express")
var mongoose = require('mongoose')
bodyParser = require('body-parser')
const alertsRouter = require('./route/alertv1')
const alertsModel = require('./models/alerts')

mongoose
    .connect("mongodb://localhost:27017/alertdb", { useNewUrlParser: true })
    .then(() => {
        var app = express()
        app.use(bodyParser.json())
        app.use("/alerts", alertsRouter)
    })