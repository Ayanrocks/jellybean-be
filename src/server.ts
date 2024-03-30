import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import logger from "./config/logger";
import {
    getDbName,
    getMongoConnection,
    initMongoConnection,
} from "./config/db";

const app: Express = express();
const port = process.env.PORT || 3000;

initMongoConnection();

app.use(logger.info)
app.use(express.json())

// routes
require("./routes/auth")(app);

app.get("/health", async (req: Request, res: Response) => {
    let client = getMongoConnection();
    try {
        await client.db(getDbName()).command({ ping: 1 });
        res.json({
            status: 200,
            status_message: "All Systems are operational",
        });
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    logger.info(`[server]: Server is running at http://localhost:${port}`);
});
