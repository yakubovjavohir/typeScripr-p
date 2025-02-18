import { Router } from "express";
import { router as userRouter } from "./user/user.routes";
import {category_router} from "./category/category.routes";
import { login_router } from "./auth/auth.routes";
const router = Router();

router.use("/user", userRouter);
router.use("/category", category_router);
router.use("/login", login_router)
export { router };
