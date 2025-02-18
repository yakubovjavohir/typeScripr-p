import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { CustomError } from "./lib/customError";
import { ResData } from "./lib/resData";
import { validator } from "./lib/validator";
import { IConfig } from "./common/types";
import { config } from "./common/config";
import { configDto } from "./common/dto/config.dto";
import { router } from "./modules/module.routes";

const app = express();

validator<IConfig>(configDto, config);

app.use(cors());
app.use(express.json());

app.use("/api", router);

app.use((req: Request, res: Response, next: NextFunction): void => {
  try {
    const method = req.method.toLowerCase();
    const path = req.url.toLowerCase();

    const message = `this is a ${method} request to ${path} is not found`;
    const statusCode = 404;

    throw new CustomError(statusCode, message);
  } catch (error) {
    next(error);
  }
});

app.use(
  (
    err: Error | CustomError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    try {
      let message = err.message;
      let statusCode = 500;

      if (err instanceof CustomError) {
        statusCode = err.statusCode;
      }

      const resData = new ResData<null>(statusCode, message);

      res.status(resData.meta.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }
);

app.listen(config.PORT, () => {
  console.log(`http://localhost:${config.PORT}`);
});
