//middleware para asegurar que solo los usuarios autenticados puedan acceder
import { verifyToken } from "../helpers/jwt.helper.js";

export const authMiddleware = (req, res, next) => {
  try {
    // Obtener token de la cookie
    const token = req.cookies["token"];
    if (!token) {
      return res
        .status(401)
        .json({ message: "no autenticado para realizar esta accion" });
    }
    // Verificar y decodificar token
    const decoded = verifyToken(token);

    console.log("token verificado", decoded);
    // Almacenar datos del usuario
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };
    next();
  } catch (error) {
    throw new Error("error en el middleware de autenticacion", error.message);
  }
};
