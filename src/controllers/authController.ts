// Auth Controller for all authentication logic

import { Request, Response, NextFunction } from "express-serve-static-core";
import { ErrorResponse } from "../types/response";
import { constants } from "http2";
import logger from "../config/logger";

export function LoginController(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    // get the email password from request
    let email: string = req.body.email || "";
    let password: string = req.body.password || "";
    console.log("Request: ", email, password, email == "", password == "");

    if (email == "" || password == "") {
        logger.info("Request2: ", email, password);
        let errorResponse: ErrorResponse = {
            status: constants.HTTP_STATUS_BAD_REQUEST,
            error_message: "email and password is empty",
            frontend_message: "Please fill out email and password",
        };
        res.status(constants.HTTP_STATUS_BAD_REQUEST).json(errorResponse);
        return;
    }

    res.send("Coming Here Login");
}
