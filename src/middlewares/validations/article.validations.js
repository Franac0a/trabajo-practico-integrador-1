import { body, param } from "express-validator";
import { articleModel } from "../../models/article.model.js";
import { userModel } from "../../models/user.model.js";
export const createArticleValidations = [
  body("title")
    .notEmpty()
    .withMessage("el titulo es obligatorio")
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage("el titulo debe de tener entre 3 y 200 caracteres"),
  body("content")
    .notEmpty()
    .withMessage("el contenido es obligatorio")
    .isLength({ min: 50 })
    .withMessage("el contenido debe de tener minimo 50 caracteres"),
  body("excerpt")
    .optional()
    .isLength({ max: 500 })
    .withMessage("el extracto debe de tener maximo 500 caracteres"),
  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage(
      "el estado no es valido, los valores permitidos son 'published' y 'archived'"
    ),
  body("user_id")
    .optional()
    .notEmpty()
    .withMessage("El user_id es obligatorio")
    .isInt()
    .withMessage("El user_id debe ser un número entero")
    .custom(async (user_id) => {
      if (Number(user_id) < 1) throw new Error("El user_id debe ser positivo");
      return true;
    })
    .custom(async (user_id) => {
      const user = await userModel.findByPk(user_id);
      if (!user) throw new Error("El usuario no existe");
      return true;
    }),
];

export const updateArticleValidations = [
  body("title")
    .optional()
    .isLength({ min: 3, max: 200 })
    .withMessage("el titulo debe de tener entre 3 y 200 caracteres"),
  body("content")
    .optional()
    .isLength({ min: 50 })
    .withMessage("el contenido debe de tener minimo 50 caracteres"),
  body("excerpt")
    .optional()
    .isLength({ max: 500 })
    .withMessage("el extracto debe de tener maximo 500 caracteres"),
  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage(
      "el estado no es valido, los valores permitidos son 'published' y 'archived'"
    ),
  body("user_id")
    .optional()
    .notEmpty()
    .withMessage("El user_id es obligatorio")
    .isInt()
    .withMessage("El user_id debe ser un número entero")
    .custom(async (user_id) => {
      if (Number(user_id) < 1) throw new Error("El user_id debe ser positivo");
      return true;
    })
    .custom(async (user_id) => {
      const user = await userModel.findByPk(user_id);
      if (!user) throw new Error("El usuario no existe");
      return true;
    }),
];

export const getArticleByIdValidations = [
  param("id")
    .notEmpty()
    .withMessage("el id es obligatorio")
    .isInt()
    .withMessage("el id debe de ser un numero entero")
    .custom(async (id) => {
      const article = await articleModel.findByPk(id);

      if (!article) {
        throw new Error("el articulo no existe");
      }
      return true;
    }),
];

export const deleteArticleValidations = [
  param("id")
    .notEmpty()
    .withMessage("el id es obligatorio")
    .isInt()
    .withMessage("el id debe de ser un numero entero")
    .custom(async (id) => {
      const article = await articleModel.findByPk(id);
      if (!article) {
        throw new Error("el articulo no existe");
      }
      return true;
    }),
];

// Article:
// ● title: 3-200 caracteres, obligatorio.
// ● content: mínimo 50 caracteres, obligatorio.
// ● excerpt: máximo 500 caracteres.
// ● status: solo valores permitidos ('published', 'archived').
// ● user_id: debe existir y coincidir con usuario autenticado (excepto admin).
