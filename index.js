const express = require('express')
require('dotenv').config()

const natsClient = require('./services/nats/index')
const apiErrorMiddleware = require('./middlewares/error-middleware')
const router = require('./routes/index')
const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(router)
app.use(apiErrorMiddleware)


natsClient.init()

app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`)
})