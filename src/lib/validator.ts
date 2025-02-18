import { ObjectSchema } from "joi";
import { CustomError } from "./customError";

export function validator<T>(scheam: ObjectSchema<T>, dto: T): void {
  const { error } = scheam.validate(dto, { abortEarly: false });

  if (error) {
    throw new CustomError(400, error.message);
  }
}
