const gradeService = require('../services/grade-service')
const studentService = require('../services/student-service')
const subjectService = require('../services/subject-service')

class GradeController {

    async getAll(req, res, next) {
        try {
            const {page, limit} = req.query
            const data = await gradeService.getAll(page, limit)
            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async getStatistic(req, res, next) {
        try {
            const {personalCode} = req.params
            const student = await studentService.getOne(personalCode)
            const subjects = await subjectService
            const data = await gradeService.getStatistic(student)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new GradeController()