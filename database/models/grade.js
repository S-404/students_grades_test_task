'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Grade extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.StudentsModel, {foreignKey: 'personalCode', as: 'student'})
            this.belongsTo(models.SubjectsModel, {foreignKey: 'subject'})
        }
    }

    Grade.init({
        personalCode: DataTypes.STRING,
        grade: DataTypes.INTEGER,
        subject: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
    }, {
        sequelize,
        modelName: 'Grade',
    });
    return Grade;
};