import { initDB } from "./src/config/database.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
//-------------------------creacion de tablas-------------------------
// import { articleModel } from "./src/models/article.model.js";
// import { tagModel } from "./src/models/tag.model.js";
// import { articleTagModel } from "./src/models/article_tag.model.js";
// import { userModel } from "./src/models/user.model.js";
// import { profileModel } from "./src/models/profile.model.js";
//--------------------------------------------------------------------
//-------------------------importacion de rutas------------------------
import { authRouter } from "./src/routes/auth.routes.js";
import { tagRouter } from "./src/routes/tag.routes.js";
import { userRouter } from "./src/routes/user.routes.js";
import { articleRouter } from "./src/routes/article.routes.js";
import { articleTagRouter } from "./src/routes/article_tag.routes.js";

dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cookieParser()); // NECESARIO: para leer req.cookies
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // CRUCIAL: permitir cookies
  })
);

app.use("/api", authRouter);
app.use("/api", tagRouter);
app.use("/api", userRouter);
app.use("/api", articleRouter);
app.use("/api", articleTagRouter);

//manejo de rutas
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
});
