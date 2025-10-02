import { articleModel } from "../models/article.model.js";
import { articleTagModel } from "../models/article_tag.model.js";
import { tagModel } from "../models/tag.model.js";
import { matchedData } from "express-validator";
export const createTag = async (req, res) => {
  try {
    const data = matchedData(req);
    console.log(data);
    const tag = tagModel.create(data);

    return res.status(201).json({ msg: "tag creada correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "error en el servidor", error: error.message });
  }
};

export const getAllTags = async (req, res) => {
  try {
    const tags = await tagModel.findAll();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ msg: "error en el servidor", error: error.message });
  }
};

export const getTagById = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await tagModel.findByPk(id, {
      include: { model: articleModel, as: "article" },
    });
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ msg: "error en el servidor", error: error.message });
  }
};

export const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await tagModel.findByPk(id);

    const data = matchedData(req, { locations: ["body", "params"] });

    console.log("req.body:", req.body);
    console.log("matchedData:", data);

    await tag.update(data);
    res.status(200).json({ msg: "tag actualizado correctamente", tag });
  } catch (error) {
    res.status(500).json({ msg: "error en el servidor", error: error.message });
  }
};
export const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await tagModel.findByPk(id);
    await tag.destroy();
    res.status(200).json({ msg: "tag eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "error en el servidor", error: error.message });
  }
};
