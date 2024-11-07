import { type NextFunction } from "express";
import { type Request, type Response } from "express";

import { auth } from "../services/auth.service";
import { type newUser } from "../services/auth.service";

export const authcontroller = {
    async register(req: Request, res: Response, next: NextFunction) {
            const user = await auth.register(req.body as newUser);

            res.status(201).send({
                status : "success",
                message : "User registered successfully",
                data: {
                user : {
                    username: user.username,
                    _id: user._id,
                },
            },
        });
    },

async login(req: Request, res: Response, next: NextFunction) { 
    const { username, password } = req.body;

    const { user, token } = await auth.login(req.body);
res.status(200).send({
    status : "success",
    message : "User logged in successfully",
    data: {
        user : {
            username: user.username,
            _id: user._id,
        },
        token,
    },
});
}
};
