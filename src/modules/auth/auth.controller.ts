import { NextFunction, Request, Response } from "express";
import { validator } from "../../lib/validator";
import { IAuthCreateDto, authCreateDto} from "./dto/auth.dto";
import { authService } from "./auth.service";
import { IAuthService } from "./interfaces/auth.service";

class AuthController {
  constructor(private readonly authService: IAuthService) {}

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto:IAuthCreateDto = req.body;

      validator<IAuthCreateDto>(authCreateDto, dto)

      const resData = await this.authService.login(dto);
      
      res.status(resData.meta.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController(authService);
