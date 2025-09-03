import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { articleModel } from "./article.model.js";
import { tagModel } from "./tag.model.js";

export const articleTagModel = sequelize.define(
  "ArticleTag",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    article_id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      references: {
        model: "articleModel",
        key: "id",
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      references: {
        model: tagModel,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);
