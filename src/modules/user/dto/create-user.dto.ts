import Joi from "joi";
import { Role } from "../../../common/enums";

export interface IUserCreateDto {
  email: string;
  password: string;
  fullname: string;
  role: Role;
  confirmPassword: string;
}

export const userCreateDto = Joi.object<IUserCreateDto, true>({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(20),
  fullname: Joi.string().required().min(2).max(36),
  role: Joi.string().required().valid(Role.ADMIN, Role.USER),
  confirmPassword: Joi.any<string>()
    .valid(Joi.ref("password"))
    .required() as any,
});
