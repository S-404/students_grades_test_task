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
            this.belongsTo(models.SubjectsModel, {foreignKey: 'subject', as: 'subjects'})
        }
    }

    Grade.init({
        personalCode: DataTypes.STRING,
        grade: DataTypes.INTEGER,
        subject: DataTypes.STRING,
        date: {
            type: DataTypes.DATE,
            get() {
                return new Date(this.dataValues.date).toISOString()
            },
        }
    }, {
        sequelize,
        modelName: 'Grade',
        timestamps: false
    });
    return Grade;
};