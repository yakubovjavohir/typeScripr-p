import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    currentUser?: object;
  }
}
export interface IConfig {
  PORT: number;
  DB_URL: string;
}

export type ID = string;

export interface IJWT {
  role:string
}