import jwt from "jsonwebtoken"
import { UserEntity } from "../modules/user/entity/user.entity"

interface IJWT {
    generateAccToken(data:UserEntity | undefined):string
    generateRefToken(data:UserEntity | undefined):string
    verifyAccToken(token:string):object
    verifyRefToken(token:string):object
}

class JWT implements IJWT{
    #accKey
    #refKey
    #accTime
    #refTime
    constructor(accKey:string, refKey:string, accTime:number, refTime:number) {
        this.#accKey = accKey;
        this.#refKey = refKey;
        this.#accTime = accTime;
        this.#refTime = refTime;
    }

    generateAccToken(data:UserEntity | undefined) {
        const token = { data, exp: Math.trunc(Date.now() / 1000) + this.#accTime };
        return jwt.sign(token, this.#accKey);
    }

    generateRefToken(data:UserEntity | undefined) {
        const token = { data, exp: Math.trunc(Date.now() / 1000) + this.#refTime };
        return jwt.sign(token, this.#refKey);
    }

    verifyAccToken(token:string) {
        const { data } = jwt.verify(token, this.#accKey) as {data:object};
        return data;
    }

    verifyRefToken(token:string) {
        const { data } = jwt.verify(token, this.#refKey) as {data:object};
        return data;
    }
}

const jwtInstance = new JWT("acc", "ref", 3600, 18400);

export {jwtInstance}