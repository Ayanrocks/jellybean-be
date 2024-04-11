// Auth Controller for all authentication logic

import { Request, Response, NextFunction } from "express-serve-static-core";
import { ErrorResponse } from "../types/response";
import { constants as status } from "http2";
import logger from "../config/logger";
import * as constants from "../constants/constants";
import { generateHash } from "../pkg/bcrypt";
import { FindUserByEmailAndPassword } from "../models/User/userService";

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

    if (password.length < 6) {
        let errorResponse: ErrorResponse = {
            status: status.HTTP_STATUS_BAD_REQUEST,
            error_message: "password string is too short",
            frontend_message:
                "Please enter a valid password of more than 6 characters",
        };
        res.status(status.HTTP_STATUS_BAD_REQUEST).json(errorResponse);
        return;
    }

    let hashedPassword = "";

    try {
        // encrypt password
        generateHash(password, (hash: string) => {
            hashedPassword = hash;
        });
        if (hashedPassword == "") {
            let errorResponse: ErrorResponse = {
                status: status.HTTP_STATUS_INTERNAL_SERVER_ERROR,
                error_message: "unable to hash password",
                frontend_message:
                    "Please enter a valid password or a different one",
            };
            res.status(status.HTTP_STATUS_INTERNAL_SERVER_ERROR).json(
                errorResponse,
            );
            return;
        }
    } catch (e) {
        logger.error("error hashing password: ", e);
        let errorResponse: ErrorResponse = {
            status: status.HTTP_STATUS_INTERNAL_SERVER_ERROR,
            error_message: "unable to hash password",
            frontend_message:
                "Please enter a valid password or a different one",
        };
        res.status(status.HTTP_STATUS_INTERNAL_SERVER_ERROR).json(
            errorResponse,
        );
        return;
    }

    // store the details by creating a new user
    let user = FindUserByEmailAndPassword(email, hashedPassword)
        .then((u) => {
            if (u !== null) {
                res.status(status.HTTP_STATUS_OK).json({ status: "ok" });
                return;
            } else {
            }
        })
        .catch((e) => {
            let errorResponse: ErrorResponse = {
                status: status.HTTP_STATUS_INTERNAL_SERVER_ERROR,
                error_message: "unable to find user" + e.error_message,
                frontend_message: "unable to find user",
            };
            res.status(status.HTTP_STATUS_INTERNAL_SERVER_ERROR).json(
                errorResponse,
            );
            return;
        });

    res.send("Coming Here Login");
}
