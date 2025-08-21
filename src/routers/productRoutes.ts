import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { productSchema } from "../schemas/productSchema.js";
import { z } from "zod";

const productRouter = Router();

function validate(schema: z.ZodTypeAny) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.issues.map(e => e.message).join(", ") });
    }
    next();
  };
}

productRouter.get("/", getProducts);
productRouter.get("/:id", getProduct);
productRouter.post("/", validate(productSchema), createProduct);
productRouter.put("/:id", validate(productSchema), updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;