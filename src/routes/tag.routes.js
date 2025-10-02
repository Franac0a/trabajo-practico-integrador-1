import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createTag,
  updateTag,
  deleteTag,
  getAllTags,
  getTagById,
} from "../controllers/tag.controller.js";
import { applyValidations } from "../middlewares/validator.js";
import {
  createTagValidations,
  updateTagValidations,
  deleteTagValidations,
  getTagIdValidations,
} from "../middlewares/validations/tag.validations.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

export const tagRouter = Router();

tagRouter.post(
  "/tags",
  authMiddleware,
  adminMiddleware,
  createTagValidations,
  applyValidations,
  createTag
);

tagRouter.get("/tags", authMiddleware, getAllTags);
tagRouter.get(
  "/tags/:id",
  authMiddleware,
  adminMiddleware,
  getTagIdValidations,
  applyValidations,
  getTagById
);
tagRouter.put(
  "/tags/:id",
  authMiddleware,
  adminMiddleware,
  updateTagValidations,
  applyValidations,
  updateTag
);
tagRouter.delete(
  "/tags/:id",
  authMiddleware,
  adminMiddleware,
  deleteTagValidations,
  applyValidations,
  deleteTag
);
