'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Subject extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.GradesModel, {foreignKey: 'subject', as: 'grades'})
        }
    }

    Subject.init({
        subject: {
            type: DataTypes.STRING,
            primaryKey: true
        }
    }, {
        sequelize,
        modelName: 'Subject',
    });
    return Subject;
};