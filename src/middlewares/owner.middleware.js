import { articleModel } from "../models/article.model.js";

export const ownerMiddleware = async (req, res, next) => {
  try {
    const article = await articleModel.findByPk(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "articulo no encontrado" });
    }

    if (req.user.role !== "admin" && req.user.id !== article.user_id) {
      return res.status(403).json({
        message: "no estas permitido para modificar este articulo",
      });
    }

    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "error interno del servidor", error: error.message });
  }
};
