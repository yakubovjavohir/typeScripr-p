import { NextFunction, Request, Response } from "express";
import { validator } from "../../lib/validator";
import { IUserCreateDto, userCreateDto } from "./dto/create-user.dto";
import { IUserService } from "./interfaces/user.service";
import { userService } from "./user.service";
import { CustomError } from "../../lib/customError";

class UserController {
  constructor(private readonly userService: IUserService) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = req.body;

      validator<IUserCreateDto>(userCreateDto, dto);

      await this.userService.isExistEmail(dto.email);

      const resData = await this.userService.create(dto);

      res.status(resData.meta.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }

  async find(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const resData = await this.userService.findAll();

      res.status(resData.meta.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = req.body;
      const id = req.params.id
    console.log("id", id);
      
      if (!id) {
        throw new CustomError(400, "Invalid ID format");
      }
  
      const resData = await this.userService.update(dto, id);
      res.status(resData.meta.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }
  
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id      
      if (!id) {
        throw new CustomError(400, "Invalid ID format");
      }
  
      const resData = await this.userService.delete(id);
      res.status(resData.meta.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }

  
    async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
        const id = req.params.id;
        if (!id) {
          throw new CustomError(400, "Invalid ID format");
        }
  
        const resData = await this.userService.findById(id);
        res.status(resData.meta.statusCode).json(resData);
      } catch (error) {
        next(error);
      }
    }
  
}

export const userController = new UserController(userService);
