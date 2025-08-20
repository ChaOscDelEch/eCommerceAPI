import { Router } from "express";

const productRouter = Router();

productRouter.get('/', (req, res) => {
  res.json({ message: "List all products" });
});

productRouter.post('/', (req, res) => {
  res.json({ message: "Create a product" });
});

export default productRouter;