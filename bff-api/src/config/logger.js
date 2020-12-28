const { createLogger, format, transports } = require('winston')
const {
  combine, timestamp, label, printf
} = format

const loggerFormat = ({
  level, message, label, timestamp
}) => {
  return `${timestamp} [${label}] ${level}: ${message}`
}

const logger = createLogger({
  format: combine(
    label({ label: 'bff-api' }),
    timestamp(),
    printf(loggerFormat)
  ),
  transports: [new transports.Console()]
})

module.exports = logger
