import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const articleModel = sequelize.define("Article", {
  title: { type: DataTypes.STRING(200), allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  excerpt: { type: DataTypes.STRING(500), allowNull: true },
  status: {
    type: DataTypes.ENUM("published", "archived"),
    defaultValue: "published",
  },
});
