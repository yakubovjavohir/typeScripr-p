import { Router } from "express";
import { categoryController } from "./category.controller";
import { auth_middlwares } from "../../middleware/auth.middlware";
import { guard_middlwares } from "../../middleware/guard.middlware";

const category_router = Router();

category_router.get("/", 
    auth_middlwares.verifyToken.bind(auth_middlwares),
    guard_middlwares.verifyRole("admin"),
    categoryController.find.bind(categoryController));

category_router.post("/create", 
    auth_middlwares.verifyToken.bind(auth_middlwares),
    guard_middlwares.verifyRole("admin"),
    categoryController.create.bind(categoryController));

category_router.post("/:id", 
    auth_middlwares.verifyToken.bind(auth_middlwares),
    guard_middlwares.verifyRole("admin"),
    categoryController.update.bind(categoryController))

category_router.delete("/:id", 
    auth_middlwares.verifyToken.bind(auth_middlwares),
    guard_middlwares.verifyRole("admin"),
    categoryController.delete.bind(categoryController))

category_router.get("/:id", 
    auth_middlwares.verifyToken.bind(auth_middlwares),
    guard_middlwares.verifyRole("admin"),
    categoryController.findById.bind(categoryController))
    
export { category_router };
