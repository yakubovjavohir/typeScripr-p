import { Router } from "express";
import { userController } from "./user.controller";
import { auth_middlwares } from "../../middleware/auth.middlware";
import { guard_middlwares } from "../../middleware/guard.middlware";

const router = Router();

router.get("/", 
    auth_middlwares.verifyToken.bind(auth_middlwares),
    guard_middlwares.verifyRole("admin"),
    userController.find.bind(userController));

router.post("/register", 
    auth_middlwares.verifyToken.bind(auth_middlwares),
    guard_middlwares.verifyRole("admin"),
    userController.create.bind(userController));

router.post("/:id", 
    auth_middlwares.verifyToken.bind(auth_middlwares),
    guard_middlwares.verifyRole("admin"),
    userController.update.bind(userController))

router.delete("/:id", 
    auth_middlwares.verifyToken.bind(auth_middlwares),
    guard_middlwares.verifyRole("admin"),
    userController.delete.bind(userController))

router.get("/:id", 
    auth_middlwares.verifyToken.bind(auth_middlwares),
    guard_middlwares.verifyRole("admin"),
    userController.findById.bind(userController))
            
export { router };
