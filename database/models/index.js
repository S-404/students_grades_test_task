'use strict'
const Sequelize = require('sequelize')
const envConfigs = require('../config/config')

const env = 'development'
const config = envConfigs[env]
const db = {}

const sequelize = new Sequelize(config.url, config)

db.StudentsModel = require('./student')(sequelize, Sequelize.DataTypes)
db.GradesModel = require('./grade')(sequelize, Sequelize.DataTypes)
db.SubjectsModel = require('./subject')(sequelize, Sequelize.DataTypes)

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
