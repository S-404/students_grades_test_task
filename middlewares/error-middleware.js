const ApiError = require('../exceptions/api-error')
const LOG = require('../utils/log')
const {Sequelize} = require('sequelize')

module.exports = function (err, req, res, next) {
    LOG('error mw got', err)

    if (err instanceof ApiError) {
        return res.status(err.status).json({
            message: err.message,
            errors: err.errors,
        })
    }

    if (err instanceof Sequelize.ValidationError) {
        return res.status(400).json({
            message: err.message,
            errors: err.errors,
        })
    }

    return res.status(500).json({message: 'unexpected error', errors: err.errors})
}