import bcrypt from "bcrypt";
import { generateToken } from "../helpers/jwt.helper.js";
import { userModel } from "../models/user.model.js";
import { profileModel } from "../models/profile.model.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { matchedData } from "express-validator";

export const register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      role,
      first_name,
      last_name,
      biography,
      avatar_url,
      birth_date,
    } = req.body;

    //hash de contaseña:
    const hashedPassword = await hashPassword(password);

    const user = await userModel.create({
      username: username,
      email: email,
      password: hashedPassword,
      role: role,
    });

    await profileModel.create({
      user_id: user.id,
      first_name: first_name,
      last_name: last_name,
      biography: biography,
      avatar_url: avatar_url,
      birth_date: birth_date,
    });

    return res.status(201).json({ msg: "usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "error en el servidor", error: error.msg });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userModel.findOne({
      where: { username },
      include: {
        model: profileModel,
        as: "profile",
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({ msg: "La contraseña es incorrecta o el Usuario no existe" });
    }

    const validatePassword = await comparePassword(password, user.password);

    if (!validatePassword) {
      return res
        .status(401)
        .json({ msg: "La contraseña es incorrecta o el Usuario no existe" });
    }

    //creacion de token:
    const token = generateToken({
      id: user.id,
      role: user.role,
    });

    //se envia ese token generado como cookie
    res.cookie("token", token, {
      httpOnly: true, // No accesible desde JavaScript
      maxAge: 1000 * 60 * 60, // 1 hora
    });

    return res.json({ msg: "Login exitoso" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "error en el servidor al loggear", error: error.msg });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token"); // se elimina la cookie del navegador
    return res.json({ msg: "Logout exitoso" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "error en el servidor al cerrar sesion", error: error.msg });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findByPk(userId, {
      include: { model: profileModel, as: "profile" },
    });

    if (!user) {
      return res.status(404).json({ msg: "usuario no encontrado" });
    }

    return res.json(user);
  } catch (error) {
    res.status(500).json({
      msg: "error en el servidor al obtener el perfil",
      error: error.msg,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });
    const userId = req.user.id;

    await profileModel.update(data, { where: { user_id: userId } });

    // console.log("req.body:", req.body);
    // console.log("matchedData:", data);
    return res.json({ msg: "Perfil actualizado correctamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error al actualizar perfil", error: error.message });
  }
};
