import bcrypt from "bcrypt";
import logger from "../config/logger";

const saltRounds = process.env.SALT_ROUNDS || "10";

export function generateHash(password: string | Buffer, cb: Function) {
    bcrypt.genSalt(parseInt(saltRounds), function (err, salt) {
        if (err) {
            logger.error("Error generating salt: ", err);
            throw err;
        }
        bcrypt.hash(password, salt, function (err, hash) {
            if (err) {
                logger.error("Error generating hash: ", err);
                throw err;
            }
            logger.info(hash);
            cb(hash);
        });
    });
}
