const gradeService = require('../services/grade-service')
const studentService = require('../services/student-service')

class GradeController {

    async getAll(req, res, next) {
        try {
            const {offset, limit} = req.query
            const data = await gradeService.getAll(offset, limit)
            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async getStatistic(req, res, next) {
        try {
            const {personalCode} = req.params
            const student = await studentService.getOne(personalCode)
            const statistic = await gradeService.getStatistic(student)
            return res.json(statistic)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new GradeController()