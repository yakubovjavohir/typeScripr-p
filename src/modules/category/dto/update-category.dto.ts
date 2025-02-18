import Joi from "joi";
import { ICategoryCreateDto } from "./create-category.dto";

export interface ICategoryUpdateDto extends Partial<ICategoryCreateDto> {}

export const categoryUpdateDto = Joi.object<ICategoryUpdateDto, true>({
  name: Joi.string().required(),
});
