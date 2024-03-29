'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Grades', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            personalCode: {
                allowNull: false,
                type: Sequelize.STRING
            },
            grade: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            subject: {
                allowNull: false,
                type: Sequelize.STRING
            },
            date: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('now')
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Grades');
    }
};