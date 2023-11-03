const {GradesModel, StudentsModel, SubjectsModel} = require('../database/models')

class GradeService {
    async create({personalCode, grade, subject}) {
        return await GradesModel.create({
            personalCode,
            grade,
            subject
        })
    }

    async getAll(offset = 0, limit) {
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

        const grades = await SubjectsModel.findAll({
            attributes: ['subject'],
            include: [{
                model: GradesModel,
                as: 'grades',
                required: false,
                attributes: ['grade'],
                where: {
                    personalCode: student.personalCode
                }
            }]
        })

        const statistic = grades.reduce((acc, subject) => {

            const stats = subject.grades.reduce((acc, curr) => {
                acc.min = Math.min(acc.min ?? curr.grade, curr.grade)
                acc.max = Math.max(acc.max, curr.grade)
                acc.sum += curr.grade
                return acc
            }, {min: null, max: null, sum: null})

            const subjectStat = {
                subject: subject.subject,
                maxGrade: stats.max ?? 0,
                minGrade: stats.min ?? 0,
                avgGrade: subject.grades.length ? stats.sum / subject.grades.length : 0,
                totalGrades: subject.grades.length
            }
            acc.push(subjectStat)
            return acc
        }, [])


        const {personalCode, lastName, name} = student

        return {
            student: {
                personalCode,
                lastName,
                name
            },
            statistic
        }

    }
}

module.exports = new GradeService()