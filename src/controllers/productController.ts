import type { RequestHandler } from "express";
import { Product } from "../models/product.ts";
import { Category } from "../models/category.ts";

export const createProduct: RequestHandler = async (req, res) => {
  const { name, description, price, categoryId } = req.body;
  // FR016: Check if category exists
  const category = await Category.findById(categoryId);
  if (!category) return res.status(400).json({ error: "Invalid categoryId" });

  const product = await Product.create({ name, description, price, categoryId });
  res.status(201).json({
    id: product._id,
    name: product.name,
    description: product.description,
    price: product.price,
    categoryId: product.categoryId,
  });
};

export const getProducts: RequestHandler = async (req, res) => {
  const filter: any = {};
  if (req.query.categoryId) filter.categoryId = req.query.categoryId;
  const products = await Product.find(filter);
  res.json(products.map(p => ({
    id: p._id,
    name: p.name,
    description: p.description,
    price: p.price,
    categoryId: p.categoryId,
  })));
};

export const getProduct: RequestHandler = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ error: "Not found" });
  res.json({
    id: product._id,
    name: product.name,
    description: product.description,
    price: product.price,
    categoryId: product.categoryId,
  });
};

export const updateProduct: RequestHandler = async (req, res) => {
  const { name, description, price, categoryId } = req.body;
  // FR016: Check if category exists if categoryId is provided
  if (categoryId) {
    const category = await Category.findById(categoryId);
    if (!category) return res.status(400).json({ error: "Invalid categoryId" });
  }
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { name, description, price, categoryId },
    { new: true }
  );
  if (!product) return res.status(404).json({ error: "Not found" });
  res.json({
    id: product._id,
    name: product.name,
    description: product.description,
    price: product.price,
    categoryId: product.categoryId,
  });
};

export const deleteProduct: RequestHandler = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ error: "Not found" });
  res.json({ message: "Product deleted" });
};

