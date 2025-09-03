import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const profileModel = sequelize.define(
  "Profile",
  {
    user_id: {
      type: DataTypes.INTEGER(20),
      allowNull: false,
      unique: true,
      references: {
        model: "userModel",
        key: "id",
      },
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    biography: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    avatar_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);
