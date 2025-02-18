import { IJWT } from "../common/types";
import { CustomError } from "../lib/customError"
import { jwtInstance } from "../lib/token"
import {Request, Response, NextFunction} from "express"
class AuthMiddlwares {
    async verifyToken(req:Request, res:Response, next:NextFunction) {
        try {
            const token:string | undefined = req.headers.authorization;
            console.log("token:", token);
            
            if (!token) {
                throw new CustomError(401, "token kirgazing..!");
            }

            const [type, tokenValue] = token.split(" ");
            
            if (!tokenValue) {
                throw new CustomError(401, "token kirgazing..!");
            }

            if (type !== "Bearer") {
                throw new CustomError(401, "token type noto'g'ri...!");
            }
            
            const payload = await jwtInstance.verifyAccToken(tokenValue);
            
            req.currentUser = payload
            console.log(req.currentUser);
            
            
            next();
        } catch (error) {
            next(error);
        }
    }
}

const auth_middlwares = new AuthMiddlwares();
export {auth_middlwares}
