const {StudentsModel} = require('../database/models')
const {BadRequest} = require("../exceptions/api-error");

class StudentService {
    async create({personalCode, name, lastName}) {
        const candidate = await this.getOne(personalCode)
        if (candidate) {
            throw BadRequest(`student ${personalCode} already exists`)
        }

        return await StudentsModel.create({
            personalCode,
            name,
            lastName
        })
    }

    async getOne(personalCode) {
        return await StudentsModel.findOne({where: {personalCode}})
    }

}

module.exports = new StudentService()