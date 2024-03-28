import {Express} from "express";

// auth routes package

module.exports = (app: Express) => {
    // use this route to search for if the user exists or not
    app.get("/login", function (req, res, next) {
        res.send("Confirmed")
    })
}