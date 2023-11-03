const {SubjectsModel} = require('../database/models')
const {BadRequest} = require("../exceptions/api-error");

class SubjectService {
    async create(subject) {
        const candidate = await this.getOne(subject)
        if (candidate) {
            throw BadRequest(`subject ${subject} already exists`)
        }
        
        return await SubjectsModel.create({subject})
    }

    async getOne(subject) {
        return await SubjectsModel.findOne({where: {subject}})
    }

}

module.exports = new SubjectService()