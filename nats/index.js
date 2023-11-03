const {connect, StringCodec, JSONCodec} = require('nats');
const subjectService = require('../services/subject-service')
const studentService = require('../services/student-service')
const gradeService = require('../services/grade-service')
const LOG = require("../utils/log");


const subject = 'students.v1.graded';
const requestSubj = 'students.v1.get'
const servers = '192.162.246.63:4222';

class NatsClient {
    natsConnection
    sc //StringCodec
    jc //JSONCodec

    //https://www.npmjs.com/package/nats#publish-and-subscribe
    async init() {
        try {
            this.natsConnection = await connect({servers});
            this.sc = StringCodec();
            this.jc = JSONCodec()

            this.#subscribe()

            await this.natsConnection.closed()
        } catch (e) {
            console.log(e)
        }
    }

    async #subscribe() {
        const sub = this.natsConnection.subscribe(subject);

        for await (const message of sub) {
            // console.log(`[${sub.getProcessed()}]: ${sc.decode(message.data)}`);
            const data = this.jc.decode(message.data)
            if (data?.data) {
                await this.#syncData(data.data)
            }
        }
    }

    async #syncData(data) {
        const {personalCode, subject} = data

        const subjectCandidate = await subjectService.getOne(subject)
        if (!subjectCandidate) {
            await subjectService.create(subject)
        }

        const studentCandidate = await studentService.getOne(personalCode)
        if (!studentCandidate) {
            const studentData = await this.#fetchStudentData(personalCode)
            await studentService.create(studentData)
        }

        await gradeService.create(data)

        LOG("syncData", data)
    }


    async #fetchStudentData(personalCode) {
        try {
            const req = await this.natsConnection.request(requestSubj, this.jc.encode({personalCode}), {timeout: 1000})
            const data = this.jc.decode(req.data)
            return data?.data
        } catch (e) {
            LOG(`fetchStudentData ${personalCode} with error`, e)
            return {personalCode, name: "", lastName: ""}
        }
    }

}

module.exports = new NatsClient()