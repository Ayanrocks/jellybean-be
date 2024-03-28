import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import initMongoConnection from "./config/db";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

initMongoConnection();

// routes
require("./routes/auth")(app);

app.get("/health", (req: Request, res: Response) => {
    res.json({
        status: 200,
    });
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
