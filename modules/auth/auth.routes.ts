import express from "express";
import { validate } from "../../middlewares/validation";
import { authenticateToken } from "../../middlewares/token";
import { loginSchema, registerSchema } from "./auth.validation";
import * as AuthController from "./auth.usecase";

const router = express.Router();

router.post("/register", validate(registerSchema), AuthController.register);
router.post("/login", validate(loginSchema), AuthController.login);
router.get('/logout', authenticateToken, AuthController.logout);
export default router;
