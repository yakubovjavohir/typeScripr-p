import Joi from "joi";

export interface IAuthCreateDto {
  email:string
  password:string
}

export const authCreateDto = Joi.object<IAuthCreateDto, true>({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6).max(20).required()
});
