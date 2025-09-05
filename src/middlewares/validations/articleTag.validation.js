import { body, param } from "express-validator";
import { articleModel } from "../../models/article.model.js";
import articleTagModel from "../../models/article_tag.model.js";
export const createArticleTagValidations = [
  body("article_id")
    .notEmpty()
    .withMessage("el id del articulo es obligatorio")
    .isInt()
    .withMessage("el id del articulo debe de ser un numero entero")
    .custom(async (article_id) => {
      const article = await articleModel.findByPk(article_id);
      if (!article) {
        throw new Error("el articulo no existe");
      }
      if (article_id <= 0) {
        throw new Error(
          "el id del articulo debe de ser un numero entero positivo"
        );
      }
      return true;
    }),
  body("tag_id")
    .notEmpty()
    .withMessage("el id de la etiqueta es obligatorio")
    .isInt()
    .withMessage("el id de la etiqueta debe de ser un numero entero")
    .custom(async (tag_id) => {
      const tag = await tagModel.findByPk(tag_id);
      if (!tag) {
        throw new Error("la etiqueta no existe");
      }
      if (tag_id <= 0) {
        throw new Error(
          "el id de la etiqueta debe de ser un numero entero positivo"
        );
      }
      return true;
    }),
];

export const deleteArticleTagValidations = [
  param("articleTagId")
    .notEmpty()
    .withMessage("el id de la relacion es obligatorio")
    .isInt()
    .withMessage("el id de la relacion debe de ser un numero entero")
    .custom(async (articleTagId) => {
      const articleTag = await articleTagModel.findByPk(articleTagId);
      if (!articleTag) {
        throw new Error("la relacion no existe");
      }
    }),
];
