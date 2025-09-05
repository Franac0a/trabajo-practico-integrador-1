import { tagModel } from "../models/tag.model";

export const createTag = async (req, res) => {
  try {
    const data = matchedData(req);

    const tag = tag.create(data);

    return res.status(201).json({ msg: "tag creada correctamente", tag });
  } catch (error) {
    res.status(500).json({ msg: "error en el servidor", error: error.msg });
  }
};

export const getAllTags = async (req, res) => {
  try {
    const tags = await tagModel.findAll();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ msg: "error en el servidor", error: error.msg });
  }
};

export const getTagById = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await tagModel.findByPk(id);
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ msg: "error en el servidor", error: error.msg });
  }
};

export const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await tagModel.findByPk(id);
    {
      const data = matchedData(req);

      await tag.update(data);
      res.status(200).json({ msg: "tag actualizado correctamente", tag });
    }
  } catch (error) {
    res.status(500).json({ msg: "error en el servidor", error: error.msg });
  }
};
export const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await tagModel.findByPk(id);
    await tag.destroy();
    res.status(200).json({ msg: "tag eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "error en el servidor", error: error.msg });
  }
};
