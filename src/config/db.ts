// Configuration File for database connection
import { MongoClient, MongoError, ServerApiVersion } from "mongodb";
import logger from "./logger";

function getMongoURL(): string {
    let mongoConnUrl = process.env.MONGODB_URL || "";

    if (mongoConnUrl && mongoConnUrl != "") {
        return mongoConnUrl;
    }

    let mongoUsername = process.env.MONGO_USERNAME || "";
    let mongoPassword = process.env.MONGO_PASSWORD || "";
    let mongoHost = process.env.MONGO_HOST || "";
    let mongoConnOpts = process.env.MONGO_CONN_OPTS || "";
    let mongoServerProtocol = process.env.IS_MONGO_SERVER ? "+srv" : "";

    let url = `mongodb${mongoServerProtocol}://${mongoUsername}:${mongoPassword}@${mongoHost}/?${mongoConnOpts}`;
    return url;
}

function getMongoConnection(): MongoClient {
    const MongoConnection = new MongoClient(getMongoURL(), {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });

    MongoConnection.connect()
        .then(() => {
            return MongoConnection;
        })
        .catch((err: MongoError) => {
            logger.error("Error Connecting to MongoDB Connection: ", err);
            return err;
        });

    return MongoConnection;
}

function getDbName(): string {
    return process.env.MONGO_DBNAME || "jellybean";
}

function initMongoConnection() {
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    pingMongoDb()
        .then((r) => {
            logger.info("DB Connected Successfully");
        })
        .catch((e) => {
            logger.error("error connecting to db: ", e);
        });
}

async function pingMongoDb() {
    let client = getMongoConnection();
    try {
        let dbName = process.env.MONGO_DBNAME || "jellybean";

        // Send a ping to confirm a successful connection
        await client.db(dbName).command({ ping: 1 });
        logger.warn(
            "Pinged your deployment. You successfully connected to MongoDB!",
        );
        return client;
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

export { initMongoConnection, getMongoConnection, getDbName };
