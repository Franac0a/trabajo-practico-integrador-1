import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { applyValidations } from "../middlewares/validator.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import {
  getUserByIdValidations,
  updateUserValidations,
  deleteUserValidations,
} from "../middlewares/validations/user.validations.js";

export const userRouter = Router();

userRouter.get("/users", authMiddleware, adminMiddleware, getAllUsers);
userRouter.get(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  getUserByIdValidations,
  applyValidations,
  getUserById
);
userRouter.put(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  updateUserValidations,
  applyValidations,
  updateUser
);
userRouter.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  deleteUserValidations,
  applyValidations,
  deleteUser
);
