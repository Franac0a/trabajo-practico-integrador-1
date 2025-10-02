import { body } from "express-validator";
import { userModel } from "../../models/user.model.js";

export const createRegisterValidations = [
  body("username")
    .notEmpty()
    .withMessage("el username debe de ser obligatorio")
    .trim()
    .isAlphanumeric()
    .withMessage("el username debe de ser alfanumerico")
    .custom(async (username) => {
      const user = await userModel.findOne({ where: { username } });
      if (user) {
        throw new Error("el username ya existe");
      }
      return true;
    })
    .isLength({ min: 3, max: 20 })
    .withMessage("el username debe de tener entre 3 y 20 caracteres"),

  body("email")
    .notEmpty()
    .withMessage("el email es obligatorio")
    .isEmail()
    .withMessage("el email debe de tener un formato valido")
    .custom(async (email) => {
      const existingEmail = await userModel.findOne({ where: { email } });
      if (existingEmail) {
        throw new Error("ya existe un usuario con ese email");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("la contraseña es obligatoria")
    .isLength({ min: 8 })
    .withMessage(
      "la contraseña debe de tener minimo 8 caracteres, 1 minuscula, 1 mayuscula y 1 numero"
    )
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    }),
  body("role")
    .optional()
    .isIn(["admin", "user"])
    .withMessage("rol no permitido, debe de ser user/admin"),
  body("first_name")
    .isString()
    .withMessage("el first name debe de tener solo letras")
    .isLength({ min: 2, max: 50 }),

  body("last_name")
    .isString()
    .withMessage("el last name debe de contener solo letras")
    .isLength({ min: 2, max: 50 }),

  body("biography")
    .optional()
    .isString()
    .withMessage("debe de ser un string")
    .isLength({ max: 500 })
    .withMessage("la biografia debe de tener maximo 500 caracteres"),
  body("avatar_url")
    .optional()
    .isURL()
    .withMessage("el avatar debe de ser una url valida"),
  body("birth_date")
    .optional()
    .isDate()
    .withMessage("el cumpleaños debe de ser una fecha valida"),
];

export const updateProfileValidations = [
  body("first_name")
    .optional()
    .isString()
    .isLength({ min: 2, max: 50 })
    .withMessage("el first name debe de tener entre 2 y 50 caracteres"),
  body("last_name")
    .optional()
    .isString()
    .isLength({ min: 2, max: 50 })
    .withMessage("el last name debe de tener entre 2 y 50 caracteres"),
  body("biography")
    .optional()
    .isString()
    .withMessage("debe de ser un string")
    .isLength({ max: 500 }),
  body("avatar_url")
    .optional()
    .isURL()
    .withMessage("debe de ser una url valida")
    .isLength({ max: 255 })
    .withMessage("la url debe de tener maximo 255 caracteres"),
  body("birth_date")
    .optional()
    .isDate()
    .withMessage("debe de ser una fecha valida"),
];

// //User/Auth:
// ● username: 3-20 caracteres, alfanumérico, único.
// ● email: formato válido, único.
// ● password: mínimo 8 caracteres, al menos una mayúscula, minúscula y número.
// ● role: solo valores permitidos ('user', 'admin').
