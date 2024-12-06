import express from "express";
import { validate } from "../../middlewares/validation";
import { authenticate } from "../../middlewares/auth";
import { updateUserSchema } from "./user.validation";
import * as UserController from "./user.usecase";

const router = express.Router();

router.use(authenticate); // Protect all routes below

router.get("/:id", UserController.getUser);
router.put("/:id", validate(updateUserSchema), UserController.updateUser);
router.delete("/:id", UserController.deleteUser);
router.get("/", UserController.getAllUsers);

export default router;
