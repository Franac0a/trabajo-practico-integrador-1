import { body, param } from "express-validator";
import { userModel } from "../../models/user.model.js";

export const getUserByIdValidations = [
  param("id")
    .notEmpty()
    .withMessage("el id es obligatorio")
    .isInt()
    .withMessage("el id debe de ser un numero entero")
    .custom(async (id) => {
      const user = await userModel.findByPk(id);
      if (!user) {
        throw new Error("el usuario no existe en la bd");
      }
      return true;
    }),
];

export const updateUserValidations = [
  param("id")
    .notEmpty()
    .withMessage("el id es obligatiorio")
    .isInt()
    .withMessage("el id debe de ser un numero entero")
    .custom(async (id) => {
      const user = await userModel.findByPk(id);
      if (!user) {
        throw new Error("el usuario no existe en la bd");
      }
      return true;
    }),
  body("username")
    .optional()
    .trim()
    .isAlphanumeric()
    .withMessage("el username debe de ser alfanumerico")
    .length({ min: 3, max: 20 })
    .withMessage("el username debe de tener entre 3 y 20 caracteres")
    .custom(async (username) => {
      const user = await userModel.findOne({ where: { username } });
      if (user) {
        throw new Error("el username ya existe, proba con otro");
      }
      return true;
    }),
  body("email")
    .optional()
    .isEmail()
    .withMessage("el email debe de tener un formato valido")
    .custom(async (email) => {
      const existingEmail = await userModel.findOne({ where: { email } });
      if (existingEmail) {
        throw new Error("ya existe un user con ese email");
      }
      return true;
    }),

  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("la contraseña debe de tener minimo 8 caracteres")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    }),
  body("role")
    .optional()
    .isIn(["admin", "user"])
    .withMessage("rol no permitido, debe de ser user/admin"),
];

export const deleteUserValidations = [
  param("id")
    .notEmpty()
    .withMessage("el id es obligatiorio")
    .isInt()
    .withMessage("el id debe de ser un numero entero")
    .custom(async (id) => {
      const user = await userModel.findByPk(id);
      if (!user) {
        throw new Error("el usuario no existe en la bd");
      }
      return true;
    }),
];
