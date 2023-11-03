const {GradesModel, StudentsModel, sequelize} = require('../database/models')

class GradeService {
    async create({personalCode, grade, subject}) {
        return await GradesModel.create({
            personalCode,
            grade,
            subject
        })
    }

    async getAll(offset = 0, limit) {

        return await GradesModel.findAll({
            attributes: [
                'id',
                'date',
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
                ['date', 'ASC']
            ]
        })
    }

    async getStatistic(student) {

        const {personalCode, lastName, name} = student

        const statisticQueryResult = await sequelize.query(`
                SELECT 
                    Subjects."subject", 
                    coalesce(max(Grades."grade"), 0) as "maxGrade",
                    coalesce(min(Grades."grade"), 0) as "minGrade",
                    coalesce(avg(Grades."grade")::float, 0) as "avgGrade",
                    count(Grades."grade")::int as "totalGrades"
                FROM public."Subjects" as Subjects
                LEFT JOIN (
                    SELECT "personalCode", "grade", "subject"
                    FROM "Grades" 
                    WHERE "personalCode" = '${personalCode}'
                    ) as Grades
                ON Subjects."subject" = Grades."subject"
                GROUP BY Subjects."subject"
        `)

        return {
            student: {
                personalCode,
                lastName,
                name
            },
            statistic: statisticQueryResult[0]
        }
    }
}

module.exports = new GradeService()