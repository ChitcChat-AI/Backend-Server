const winston = require('winston');
const { WinstonRotatingFile } = require("winston-rotating-file");
const { combine, timestamp, printf } = winston.format;
const customLevels = {
    levels: {
        trace: 5,
        debug: 4,
        info: 3,
        warn: 2,
        error: 1,
        fatal: 0,
    },
    colors: {
        trace: 'white',
        debug: 'green',
        info: 'green',
        warn: 'yellow',
        error: 'red',
        fatal: 'red',
    },
};
const loggerFormat = printf(({ level, message, label, timestamp }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message};\n`;
});


class Logger {
     #logger;

    constructor() {

        this.#logger = winston.createLogger({
            level:  'error',
            colorize: true,
            levels: customLevels.levels,
            transports: [
                new winston.transports.Console({
                    format: combine(
                        timestamp(),
                        loggerFormat
                    )
                }),
                new WinstonRotatingFile({
                    filename: "logs/error.log",
                    level: 'error',
                    rfsOptions: {
                        size: "10M", // rotate every 10 MegaBytes written
                        compress: "gzip" // compress rotated files
                    }
                })
            ],
            format: combine(
                timestamp(),
                loggerFormat
            ),
        });
    winston.addColors(customLevels.colors);
    }

    trace(msg, meta) {
    this.#logger.log('trace', msg, meta);
}

debug(msg, meta) {
    this.#logger.debug(msg, meta);
}

info(msg, meta) {
    this.#logger.info(msg, meta);
}

warn(msg, meta) {
    this.#logger.warn(msg, meta);
}

error(msg, meta) {
    this.#logger.error(msg, meta);
}

fatal(msg, meta) {
    this.#logger.log('fatal', msg, meta);
}
}

 const logger = new Logger();

module.exports= {logger};