import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const tagModel = sequelize.define(
  "Tag",
  {
    name: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
