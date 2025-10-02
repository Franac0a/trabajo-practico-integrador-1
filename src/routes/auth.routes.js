import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
} from "../controllers/auth.controller.js";

import { applyValidations } from "../middlewares/validator.js";
import {
  updateProfileValidations,
  createRegisterValidations,
} from "../middlewares/validations/auth.validations.js";

export const authRouter = Router();

//rutas publicas
authRouter.post(
  "/auth/register",
  createRegisterValidations,
  applyValidations,
  register
);
authRouter.post("/auth/login", login);

//rutas privadas
authRouter.post("/auth/logout", authMiddleware, logout);
authRouter.get("/auth/profile", authMiddleware, getProfile);
authRouter.put(
  "/auth/profile",
  authMiddleware,
  updateProfileValidations,
  applyValidations,
  updateProfile
);
