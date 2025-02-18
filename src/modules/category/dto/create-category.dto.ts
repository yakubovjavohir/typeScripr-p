import Joi from "joi";

export interface ICategoryCreateDto {
  name:string
}

export const categoryCreateDto = Joi.object<ICategoryCreateDto, true>({
  name: Joi.string().required(),
});
