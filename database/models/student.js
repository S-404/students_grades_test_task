'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Student extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.GradesModel, {foreignKey: 'personalCode', as: 'grades'})
        }
    }

    Student.init({
        name: DataTypes.STRING,
        lastName: DataTypes.STRING,
        personalCode: {
            type: DataTypes.STRING,
            primaryKey: true
        }
    }, {
        sequelize,
        modelName: 'Student',
    });
    return Student;
};