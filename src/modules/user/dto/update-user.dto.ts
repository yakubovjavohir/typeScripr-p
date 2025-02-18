import Joi from "joi";
import { Role } from "../../../common/enums";
import { IUserCreateDto } from "./create-user.dto";

export interface IUserUpdateDto extends Partial<IUserCreateDto> {}

export const userUpdateDto = Joi.object<IUserUpdateDto, true>({
  email: Joi.string().optional().email(),
  password: Joi.string().optional().min(6).max(20),
  fullname: Joi.string().optional().min(2).max(36),
  role: Joi.string().optional().valid(Role.ADMIN, Role.USER),
  confirmPassword: Joi.any<string>()
    .valid(Joi.ref("password"))
    .required() as any,
});
