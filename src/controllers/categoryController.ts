import type { RequestHandler } from "express";
// Make sure the path and export are correct; adjust as needed:
import { Category } from "#models";

export const createCategory: RequestHandler = async (req, res) => {
  const { name } = req.body;
  const exists = await Category.exists({ name });
  if (exists) return res.status(400).json({ error: "Category already exists" });
  const category = await Category.create({ name });
  res.status(201).json({ id: category._id, name: category.name });
};

export const getCategories: RequestHandler = async (_req, res) => {
  const categories = await Category.find();
  res.json(categories.map(c => ({ id: c._id, name: c.name })));
};

export const getCategory: RequestHandler = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ error: "Not found" });
  res.json({ id: category._id, name: category.name });
};

export const updateCategory: RequestHandler = async (req, res) => {
  const { name } = req.body;
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true }
  );
  if (!category) return res.status(404).json({ error: "Not found" });
  res.json({ id: category._id, name: category.name });
};

export const deleteCategory: RequestHandler = async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) return res.status(404).json({ error: "Not found" });
  res.json({ message: "Category deleted" });
};