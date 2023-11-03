const {GradesModel, StudentsModel} = require('../database/models')

class GradeService {
    async create({personalCode, grade, subject}) {
        return await GradesModel.create({
            personalCode,
            grade,
            subject
        })
    }

    async getAll(page = 1, limit = 100) {
        return {page, limit}
    }

    async getStatistic(student) {

    }
}

module.exports = new GradeService()