import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { articleModel } from "./article.model.js";

export const userModel = sequelize.define(
  "User",
  {
    username: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(255), allowNull: false },
    role: { type: DataTypes.ENUM("admin", "user"), defaultValue: "user" },
  },
  { paranoid: true }
);

userModel.hasMany(articleModel, { foreignKey: "user_id", as: "articles" });
articleModel.belongsTo(userModel, { foreignKey: "user_id", as: "author" });
