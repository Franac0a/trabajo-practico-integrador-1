import { param, body } from "express-validator";
import tagModel from "../../models/tag.model.js";
export const createTagValidations = [
  body("name")
    .notEmpty()
    .withMessage("el nombre de la etiqueta es obligatorio")
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage(
      "el nombre de la etiqueta debe de tener entre 2 y 30 caracteres"
    )
    .custom(async (name) => {
      const tag = await tagModel.findOne({ where: { name } });
      if (tag) {
        throw new Error("la etiqueta ya existe");
      }
    }),
];
