import { Router } from "express";
import { authController } from "./auth.controller";

const login_router = Router();

login_router.post("/", authController.login.bind(authController));

export { login_router };
