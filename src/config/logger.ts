import winston, { format } from "winston";

const logger = winston.createLogger({
    defaultMeta: { service: "jellybean" },
    transports: [
        new winston.transports.Console({
            format: format.combine(
                format.colorize({ all: true }),
                format.timestamp({
                    format: "YYYY-MM-DD HH:mm:ss",
                }),
                format.ms(),
                format.errors({ stack: true }),
                format.simple(),
            ),
        }),
        new winston.transports.File({
            filename: "error.log",
            level: "error",
            tailable: true,
            format: format.combine(
                format.timestamp({
                    format: "YYYY-MM-DD HH:mm:ss",
                }),
                format.ms(),
                format.errors({ stack: true }),
                format.simple(),
            ),
        }),
        new winston.transports.File({
            filename: "jellybean.log",
            tailable: true,
            format: format.combine(
                format.timestamp({
                    format: "YYYY-MM-DD HH:mm:ss",
                }),
                format.ms(),
                format.errors({ stack: true }),
                format.simple(),
            ),
        }),
    ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "local") {
    logger.add(
        new winston.transports.Console({
            format: winston.format.json(),
        }),
    );
}

export default logger;
