const LOG = (text, ...rest) => {
    const date = new Date()
    console.debug(`\x1b[33m +++ ${date.toTimeString()} ${text}: \x1b[0m`, ...rest)
}

module.exports = LOG