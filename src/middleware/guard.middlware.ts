import { string } from "joi"
import { Role } from "../common/enums"
import { CustomError } from "../lib/customError"
import { Request, Response, NextFunction } from "express"
import { IJWT } from "../common/types"

class GuardMiddlwares {

    verifyRole(...roles:Array<string>) {
        return function (req:Request, res:Response, next:NextFunction) {
            try {
                if (roles.length === 0) {
                    return next()
                }

                const currentUser = req.currentUser as IJWT
                
                if (!currentUser) {
                    throw new CustomError(500, "currentUser is not provided")
                }

                
                const user:string = currentUser.role
                if (user !== roles[0]) {
                    throw new CustomError(403, "sizga ruxsat yo'q!")
                }
                

                next()
            } catch (error) {
                next(error)
            }
        }
    }
}

const guard_middlwares = new GuardMiddlwares()

export {guard_middlwares}
