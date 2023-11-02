const Router = require('express')
const gradeController = require('../controllers/grade-controller')

const router = new Router()

router.get('/log', gradeController.getAll)
router.get('/statistic/:personalCode', gradeController.getStatistic)

module.exports = router