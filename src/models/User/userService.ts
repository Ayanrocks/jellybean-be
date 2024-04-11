import { getMongoConnection, getMongoDb } from "../../config/db";
import * as constants from "../../constants/collections";
import logger from "../../config/logger";

export async function FindUserByEmailAndPassword(
    email: string,
    hashedPassword: string,
) {
    if (email == "" || hashedPassword == "") {
        logger.error("both email and password is empty");
        return;
    }
    // get user collection
    const db = getMongoDb();
    let userCollection = db.collection(constants.UserCollection);

    try {
        let userRecord = await userCollection.findOne({
            email,
            password: hashedPassword,
            is_deleted: { $ne: true },
            $or: [{ deleted_at: { $exist: false } }, { deleted_at: null }],
        });

        return userRecord;
    } catch (e) {
        logger.error(e)
    }

    return null;
}
