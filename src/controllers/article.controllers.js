import { matchedData } from "express-validator";
import { articleModel } from "../models/article.model.js";

export const getAllArticles = async (req, res) => {
  try {
    const articles = await articleModel.findAll();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ msg: "error en el servidor" });
  }
};

export const getUserArticles = async (req, res) => {
  try {
    const articles = await articleModel.findAll();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ msg: "error en el servidor" });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await articleModel.findByPk(id);
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ msg: "error en el servidor", error: error.msg });
  }
};

export const createArticle = async (req, res) => {
  try {
    const data = matchedData(req);

    const article = await articleModel.create(data);

    return res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ msg: "error en el servidor", error: error.message });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await articleModel.findByPk(id);

    const data = matchedData(req);

    await article.update(data);

    res
      .status(200)
      .json({ msg: "articulo actualizado correctamente", article });
  } catch (error) {
    res.status(500).json({
      msg: "error en el servidor al actualizar el articulo",
      error: error.msg,
    });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await articleModel.findByPk(id);
    await article.destroy();
    res.status(200).json({ msg: "articulo eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "error en el servidor", error: error.msg });
  }
};
