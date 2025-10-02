import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const tagModel = sequelize.define("tag", {
  name: { type: DataTypes.STRING(30), unique: true },
});
