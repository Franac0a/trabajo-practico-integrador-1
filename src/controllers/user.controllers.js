import { matchedData } from "express-validator";
import { userModel } from "../models/user.model.js";
import { profileModel } from "../models/profile.model.js";
import { articleModel } from "../models/article.model.js";

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = userModel.findByPk(id);
    const data = matchedData(req);

    await user.update(data);

    res.status(200).json({ msg: "usuario actualizado correctamente", user });
  } catch (error) {
    res.status(500).json({ msg: "error en el servidor al actualizar el user" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.findAll({
      attributes: { exclude: ["password"] },
      include: { model: profileModel, as: "profile" },
    });

    await res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: "error en el servidor", error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByPk(id, {
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      include: [
        {
          model: profileModel,
          as: "profile",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: articleModel,
          as: "articles",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: "error en el servidor", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByPk(id);

    await user.destroy();
    res.status(200).json({ msg: "usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "error en el servidor", error: error.message });
  }
};
