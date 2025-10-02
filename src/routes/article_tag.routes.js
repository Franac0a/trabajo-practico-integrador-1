import { Router } from "express";
import {
  createArticleTagValidations,
  deleteArticleTagValidations,
} from "../middlewares/validations/article_tags.validations.js";
import {
  createArticleTag,
  deleteArticleTag,
} from "../controllers/article_tags.controller.js";
import { applyValidations } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorAdminMiddleware } from "../middlewares/author_admin.middleware.js";

export const articleTagRouter = Router();

articleTagRouter.post(
  "/articles-tags",
  authMiddleware,
  authorAdminMiddleware,
  createArticleTagValidations,
  applyValidations,
  createArticleTag
);

articleTagRouter.delete(
  "/articles-tags/:articleTagId",
  authMiddleware,
  deleteArticleTagValidations,
  applyValidations,
  deleteArticleTag
);
