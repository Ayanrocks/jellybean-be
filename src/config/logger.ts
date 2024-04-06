import winston, { format } from "winston";
import * as constants from "../constants/constants";

const ConsoleTransport = new winston.transports.Console({
    format: format.combine(
        format.colorize({ all: true }),
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.ms(),
        format.errors({ stack: true }),
        format.simple(),
    ),
});
const ErrorTransport = new winston.transports.File({
    filename: process.env.ERROR_LOG_FILE_NAME || "error.log",
    level: "error",
    tailable: true,
    format: format.combine(
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.ms(),
        format.errors({ stack: true }),
        format.json(),
    ),
});

const StdOutTransport = new winston.transports.File({
    filename: process.env.LOG_FILE_NAME || "jellybean.log",
    tailable: true,
    format: format.combine(
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.ms(),
        format.errors({ stack: true }),
        format.json(),
    ),
});

const logger = winston.createLogger({
    defaultMeta: { service: "jellybean" },
    transports: [ConsoleTransport, ErrorTransport, StdOutTransport],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== constants.LocalEnv) {
    logger.add(
        new winston.transports.Console({
            format: winston.format.json(),
        }),
    );
}

if (process.env.NODE_ENV == constants.ProductionEnv) {
    logger.remove(ConsoleTransport);
}

export default logger;
