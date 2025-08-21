import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { createCategory, getCategories, getCategory, deleteCategory } from "#controllers";
import { categorySchema } from "../schemas/categorySchema.ts";
import { z } from "zod";

const categoryRouter = Router();

function validate(schema: z.ZodTypeAny) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.issues.map(e => e.message).join(", ") });
    }
    next();
  };
}

categoryRouter.get("/", getCategories);
categoryRouter.get("/:id", getCategory);
categoryRouter.post("/", validate(categorySchema), createCategory);
// categoryRouter.put("/:id", validate(categorySchema), updateCategory);
categoryRouter.delete("/:id", deleteCategory);

export default categoryRouter;