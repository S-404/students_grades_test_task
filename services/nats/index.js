require('dotenv').config()
const {connect, StringCodec, JSONCodec} = require('nats');
const subjectService = require('../subject-service')
const studentService = require('../student-service')
const gradeService = require('../grade-service')
const LOG = require("../../utils/log");


const GRADES_SUBSCRIBE_SUBJECT = 'students.v1.graded';
const STUDENT_REQUEST_SUBJECT = 'students.v1.get'
const NATS_SERVER = process.env.NATS_SERVER;

class NatsClient {
    natsConnection
    sc //StringCodec
    jc //JSONCodec

    //https://www.npmjs.com/package/nats#publish-and-subscribe
    async init() {
        try {
            this.natsConnection = await connect({servers: NATS_SERVER});
            this.sc = StringCodec();
            this.jc = JSONCodec()

            this.#subscribe()

            await this.natsConnection.closed()
        } catch (e) {
            console.log(e)
        }
    }

    async #subscribe() {
        const sub = this.natsConnection.subscribe(GRADES_SUBSCRIBE_SUBJECT);

        for await (const message of sub) {
            const data = this.jc.decode(message.data)
            if (data?.data) {
                try {
                    await this.#syncData(data.data)
                } catch (e) {
                    LOG("syncData error", "smth went wrong")
                }

            }
        }
    }

    async #syncData(data) {
        const {personalCode, subject} = data

        const subjectCandidate = await subjectService.getOne(subject)
        if (!subjectCandidate) {
            await subjectService.create(subject)
            LOG("created subject", subject)
        }

        const studentIsExist = await studentService.isExist(personalCode)
        if (!studentIsExist) {
            const studentData = await this.#fetchStudentData(personalCode)
            await studentService.create(studentData)
            LOG("created student", studentData)
        }

        await gradeService.create(data)

        LOG("syncData", data)
    }


    async #fetchStudentData(personalCode) {
        const unknownStudent = {personalCode, name: "unknown", lastName: "unknown"}

        try {
            const req = await this.natsConnection.request(
                STUDENT_REQUEST_SUBJECT, this.jc.encode({personalCode}), {timeout: 2000}
            )
            const data = this.jc.decode(req.data)

            if ("error" in data) {
                LOG(`fetchStudentData ${personalCode} with error`, data.error)
            }

            return data?.data ?? unknownStudent
        } catch (e) {
            LOG(`fetchStudentData ${personalCode} with error`, e)
            return unknownStudent
        }
    }

}

module.exports = new NatsClient()