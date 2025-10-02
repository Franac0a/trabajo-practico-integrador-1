import { matchedData } from "express-validator";
import { articleTagModel } from "../models/article_tag.model.js";

export const createArticleTag = async (req, res) => {
  try {
    const data = matchedData(req);
    console.log(data);
    const articleTag = await articleTagModel.create(data);
    return res.status(201).json(articleTag);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteArticleTag = async (req, res) => {
  try {
    const { articleTagId } = matchedData(req);

    const articleTag = await articleTagModel.findByPk(articleTagId);

    await articleTag.destroy();

    return res.status(200).json({ msg: "relacion eliminada" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "error en el servidor", error: error.message });
  }
};
