import Joi from "joi";
import { IConfig } from "../types";

export const configDto = Joi.object<IConfig, true>({
  PORT: Joi.number().required().min(1000).max(9999),
  DB_URL: Joi.string().required(),
});
