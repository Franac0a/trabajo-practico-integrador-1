import { articleModel } from "../models/article.model.js";

export const authorAdminMiddleware = async (req, res, next) => {
  try {
    const user = req.user;
    const { id } = req.params;

    if (!user) {
      return res.status(401).json({ message: "usuario no autenticado" });
    }

    const { article_id } = req.body;
    const article = await articleModel.findByPk(article_id);

    if (!article) {
      return res.status(404).json({ message: "articulo no encontrado" });
    }

    // Permitir si es admin o autor
    if (user.role === "admin" || article.user_id === user.id) {
      return next();
    }

    return res.status(403).json({
      message: "No tienes permisos para acceder a este recurso",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error en la validación de permisos",
      error: error.message,
    });
  }
};
