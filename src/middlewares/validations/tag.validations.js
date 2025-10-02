import { param, body } from "express-validator";
import { tagModel } from "../../models/tag.model.js";
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

export const deleteTagValidations = [
  param("id")
    .notEmpty()
    .withMessage("el id de la etiqueta es obligatorio")
    .isInt()
    .withMessage("el id de la etiqueta debe de ser un numero entero")
    .custom(async (id) => {
      const tag = await tagModel.findByPk(id);
      if (!tag) {
        throw new Error("la etiqueta no existe en la  base de datos");
      }
      return true;
    }),
];

export const updateTagValidations = [
  param("id")
    .notEmpty()
    .withMessage("el id de la etiqueta es obligatorio")
    .isInt()
    .withMessage("el id de la etiqueta debe de ser un numero entero")
    .custom(async (id) => {
      const tag = await tagModel.findByPk(id);
      if (!tag) {
        throw new Error("la etiqueta no existe en la base de datos");
      }
      return true;
    }),
  body("name")
    .notEmpty()
    .withMessage("el nombre de la etiqueta no puede estar vacio")
    .trim()
    .isLength({ min: 2, max: 30 }),
];

export const getTagIdValidations = [
  param("id")
    .notEmpty()
    .withMessage("el id de la etiqueta es obligatorio")
    .isInt()
    .withMessage("el id de la etiqueta debe de ser un numero entero")
    .custom(async (id) => {
      const tag = await tagModel.findByPk(id);
      if (!tag) {
        throw new Error("la etiqueta no existe en la base de datos");
      }
      return true;
    }),
];
