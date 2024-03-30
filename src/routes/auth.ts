import { Express } from "express";
import { getDbName, getMongoConnection } from "../config/db";
import { LoginController } from "../controllers/authController";

// auth routes package

module.exports = (app: Express) => {
    // use this route to search for if the user exists or not
    app.get("/login", LoginController);
};
