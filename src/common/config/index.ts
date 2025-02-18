import { config as dotEnvConfig } from "dotenv";
import { IConfig } from "../types";

dotEnvConfig();

export const config: IConfig = {
  PORT: Number(process.env.PORT),
  DB_URL: process.env.DB_URL as string,
};
