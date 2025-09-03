import express from "express";
import "dotenv/config";
import { sequelize, startDb } from "./src/config/database.js";
import { userModel } from "./src/models/user.model.js";
import { profileModel } from "./src/models/profile.model.js";
import { articleModel } from "./src/models/article.model.js";
import { articleTagModel } from "./src/models/articleTag.model.js";
import { tagModel } from "./src/models/tag.model.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.get("/api");

const startServer = async () => {
  await startDb();
  await userModel.sync();
  await profileModel.sync();
  await articleModel.sync();
  await articleTagModel.sync();
  await tagModel.sync();
  console.log("Tablas creadas");
};

app.get("/", (req, res) => {
  res.send("Server ready");
});

app.listen(PORT, async () => {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log(`El server está corriendo en: http://localhost:${PORT}`);
});

startServer();
