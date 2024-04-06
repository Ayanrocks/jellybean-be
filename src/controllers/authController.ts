// Auth Controller for all authentication logic

import { Request, Response, NextFunction } from "express-serve-static-core";
import { ErrorResponse } from "../types/response";
import { constants as status } from "http2";
import logger from "../config/logger";
import * as constants from "../constants/constants";

export function LoginController(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    // get the email password from request
    let email: string = req.body.email || "";
    let password: string = req.body.password || "";

    if (email == "" || password == "") {
        let errorResponse: ErrorResponse = {
            status: status.HTTP_STATUS_BAD_REQUEST,
            error_message: "email and password is empty",
            frontend_message: "Please fill out email and password",
        };
        res.status(status.HTTP_STATUS_BAD_REQUEST).json(errorResponse);
        return;
    }

    // if email and password is there verify it.
    // adding regex to verify email format
   if (!email.match(constants.EmailRegex)) {
       let errorResponse: ErrorResponse = {
           status: status.HTTP_STATUS_BAD_REQUEST,
           error_message: "email is valid",
           frontend_message: "Please enter a valid email",
       };
       res.status(status.HTTP_STATUS_BAD_REQUEST).json(errorResponse);
       return;
   }

   if(password.length < 6) {
       let errorResponse: ErrorResponse = {
           status: status.HTTP_STATUS_BAD_REQUEST,
           error_message: "password string is too short",
           frontend_message: "Please enter a valid password of more than 6 characters",
       };
       res.status(status.HTTP_STATUS_BAD_REQUEST).json(errorResponse);
       return;
   }

   // encrypt password


    res.send("Coming Here Login");
}
