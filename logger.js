// logger.js
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

// Define a custom log format that handles objects
const customFormat = printf(({ level, message, timestamp, ...metadata }) => {
    let msg = `${timestamp} [${level}]: ${message}`;
    if (metadata) {
        msg += ` ${JSON.stringify(metadata)}`;
    }
    return msg;
});

// Create the logger instance
const logger = createLogger({
    level: 'info', // Set the minimum log level
    format: combine(
        timestamp(),
        customFormat
    ),
    transports: [
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' })
    ]
});

// If we're not in production then log to the console as well
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.simple()
    }));
}

module.exports = logger;
