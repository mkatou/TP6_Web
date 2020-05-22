//const uuidv1 = require('uuid/v1')
const mongoose = require('mongoose')


const alertSchema = mongoose.Schema({
    name: String,
    status: String,
    label: String,
    type: String,
    from: String,
    to: String
})

const alerts = mongoose.model('alert', alertSchema);


const get = (id) => {
    const alertsFound = alerts.filter((alert) => user.id === id)
    return alertsFound.length >= 1 ?
        usersFound[0] :
        undefined
}

const getAll = () => {
    return alerts
}

const add = (alert) => {
    const newalerts = {
        ...alert,
        id: uuidv1()
    }
    if (validateUser(newAlert)) {
        alerts.push(newAlert)
    } else {
        throw new Error('alert.not.valid')
    }
    return newAlert
}

const update = (id, newAlertProperties) => {
    const alertFound = alerts.filter((alert) => alert.id === id)

    if (alertFound.length === 1) {
        const oldAlert = alertFound[0]

        const newAlert = {
            ...oldAlert,
            ...newAlertProperties
        }

        // Control data to patch
        if (validateAlert(newAlert)) {

            Object.assign(olAlert, newAlert)
        } else {
            throw new Error('alert.not.valid')
        }
    } else {
        throw new Error('alert.not.found')
    }
}

const remove = (id) => {
    const indexFound = alert.findIndex((alert) => alert.id === id)
    if (indexFound > -1) {
        alert.splice(indexFound, 1)
    } else {
        throw new Error('alert.not.found')
    }
}

function validateAlert(alert) {
    let result = true
    if (alert && alert.id && alert.status && alert.name && alert.label) {
        result = true
    }
    return result
}

exports.get = get
exports.getAll = getAll
exports.add = add
exports.update = update
exports.remove = remove

module.exports = mongoose.model("modelAlert", alertSchema)