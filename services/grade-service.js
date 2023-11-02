class GradeService {
    async create() {

    }

    async getAll(page = 1, limit = 100) {
        return {page, limit}
    }

    async getStatistic(student) {

    }
}

module.exports = new GradeService()