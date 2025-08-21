import { Router } from 'express';
import {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
} from '#controllers';

const categoryRouter = Router();

categoryRouter.get('/', getCategories);
categoryRouter.get('/:id', getCategory);
categoryRouter.post('/', createCategory);
// categoryRouter.put("/:id",  updateCategory);
categoryRouter.delete('/:id', deleteCategory);

export default categoryRouter;