import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { articleModel } from "./article.model.js";
import { tagModel } from "./tag.model.js";

export const articleTagModel = sequelize.define("article_tag", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});

///relaciones
articleModel.belongsToMany(tagModel, {
  through: articleTagModel,
  foreignKey: "article_id",
  as: "tag",
  onDelete: "CASCADE",
});

tagModel.belongsToMany(articleModel, {
  through: articleTagModel,
  foreignKey: "tag_id",
  as: "article",
  onDelete: "CASCADE",
});

//config necesaria para obtener los datos

articleTagModel.belongsTo(tagModel, {
  foreignKey: "tag_id",
  as: "tag",
  onDelete: "CASCADE",
});
articleTagModel.belongsTo(articleModel, {
  foreignKey: "article_id",
  as: "article",
  onDelete: "CASCADE",
});
