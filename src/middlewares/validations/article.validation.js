import { body } from "express-validator";
import { articleModel } from "../../models/article.model.js";

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
  body("user_id").custom((value, { req }) => {
    if (req.user.role === "admin") {
      //si es admin puede asignar cualquier user_id u omitirlo
      return true;
    }
    //si NO es admin, el user_id enviado debe coincidir con el del token
    if (value !== req.user.id) {
      throw new Error("El user_id no coincide con el usuario autenticado");
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
