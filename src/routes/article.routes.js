import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createArticle,
  updateArticle,
  getUserArticles,
  getAllArticles,
  getArticleById,
  deleteArticle,
} from "../controllers/articles.controller.js";
import { applyValidations } from "../middlewares/validator.js";
import { ownerMiddleware } from "../middlewares/owner.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import {
  createArticleValidations,
  updateArticleValidations,
  deleteArticleValidations,
  getArticleByIdValidations,
} from "../middlewares/validations/article.validations.js";
import { authorAdminMiddleware } from "../middlewares/author_admin.middleware.js";

export const articleRouter = Router();

articleRouter.post(
  "/articles",
  authMiddleware,
  createArticleValidations,
  applyValidations,
  createArticle
);
articleRouter.get("/articles/user", authMiddleware, getUserArticles);
articleRouter.get("/articles", authMiddleware, getAllArticles);
articleRouter.get(
  "/articles/:id",
  authMiddleware,
  getArticleByIdValidations,
  applyValidations,
  getArticleById
);

articleRouter.get(
  "/articles/user/:id",
  authMiddleware,
  getArticleByIdValidations,
  applyValidations,
  getArticleById
);
articleRouter.put(
  "/articles/:id",
  authMiddleware,
  authorAdminMiddleware,
  updateArticleValidations,
  applyValidations,
  updateArticle
);
articleRouter.delete(
  "/articles/:id",
  authMiddleware,
  authorAdminMiddleware,
  deleteArticleValidations,
  applyValidations,
  deleteArticle
);
