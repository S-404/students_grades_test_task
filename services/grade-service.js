const {GradesModel, StudentsModel} = require('../database/models')

class GradeService {
    async create({personalCode, grade, subject}) {
        return await GradesModel.create({
            personalCode,
            grade,
            subject
        })
    }

    async getAll(offset = 0, limit ) {
        //TODO pagination
        return await GradesModel.findAll({
            attributes: [
                'id',
                ['createdAt', 'date'], //TODO check iso format
                'subject',
                'grade'
            ],
            include: [{
                model: StudentsModel,
                as: 'student',
                required: false,
                attributes: ['personalCode', 'name', 'lastName']
            }],
            limit,
            offset,
            order: [
                ['createdAt', 'ASC']
            ]
        })
    }

    async getStatistic(student) {

    }
}

module.exports = new GradeService()