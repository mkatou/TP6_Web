const express = require('express')
const alerts = require('../models/alert')
const router = express.Router()


let alertModel = undefined


router.use((req, res, next) => {
    if (!alertModel) {
        res
            .status(500)
            .json({ message: `model not initialised` })
    }
    next()
})

router.get('/:id', function(req, res, next) {
    const id = req.params.id
    if (id) {
        try {
            const alertFound = alertModel.get(id)
            if (alertFound) {
                res.json(alertFound)
            } else {
                res
                    .status(404)
                    .json({ message: `alert not found with id ${id}` })
            }
        } catch (exc) {
            res
                .status(400)
                .json({ message: exc.message })
        }

    } else {
        res
            .status(400)
            .json({ message: `Wrong parameter` })
    }
})


router.post('/', function(req, res, next) {
    const newUser = req.body

    if (newAlert) {
        try {
            const alert = alertModel.add(newAlert)
            req
                .res
                .status(201)
                .send(alert)
        } catch (exc) {
            res
                .status(400)
                .json({ message: exc.message })
        }
    } else {
        res
            .status(400)
            .json({ message: `Wrong parameters` })
    }
})

router.patch('/:id', function(req, res, next) {
    const id = req.params.id
    const newAlertProperties = req.body

    if (id && newAlertProperties) {
        try {
            if (id && newAlertProperties) {
                const updated = alertModel.update(id, newAlertProperties)
                res
                    .status(200)
                    .json(updated)
            } else {
                res
                    .status(400)
                    .json({ message: `Wrong parameter` })
            }
        } catch (exc) {
            if (exc.message === 'alert.not.found') {
                res
                    .status(404)
                    .json({ message: `Alert not found with id ${id}` })
            } else if (exc.message === 'alert.not.valid') {
                res
                    .status(400)
                    .json({ message: `Invalid alert data` })
            }
        }
    } else {
        res
            .status(400)
            .json({ message: `Wrong parameters` })
    }
})

router.delete('/:id', function(req, res, next) {
    const id = req.params.id
    if (id) {
        try {
            alertModel.remove(id)
            req
                .res
                .status(200)
                .end()
        } catch (exc) {
            if (exc.message === 'alert.not.found') {
                res
                    .status(404)
                    .json({ message: `alert not found with id ${id}` })
            } else {
                res
                    .status(400)
                    .json({ message: exc.message })
            }
        }
    } else {
        res
            .status(400)
            .json({ message: `Wrong parameter` })
    }
})

router.get('/', function(req, res, next) {
    res.json(alertModel.getAll())
})

module.exports = (model) => {
    alertsModel = model
    return router
}