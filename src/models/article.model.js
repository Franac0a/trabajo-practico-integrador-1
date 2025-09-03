import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const articleModel = sequelize.define(
  "Article",
  {
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    excerpt: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("published", "archived"),
      defaultValue: "published",
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      references: {
        model: "userModel",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);
