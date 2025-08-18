import { Router } from "express";
import Category from "../models/Category"; 

const categoryRouter = Router();

categoryRouter.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create({
      name: req.body.name,
    });
    res.status(201).json(newCategory);
  } catch (error: any) {
    console.error('Error creating category:', error);
    res.status(400).json({ error: error.message });
  }
});

categoryRouter.get('/', async (req, res)=> {
    try {
        const categories = await Category.find({});
        res.json(categories);
    } catch (error:any) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories.'});
    }
});

categoryRouter.get('/:id', async (req, res)=> {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category);
    } catch (error:any) {
        console.error('Error fetching category:', error);
        res.status(500).json({ error: 'Failed to fetch category.'});
    }
});

categoryRouter.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(updatedCategory);
  } catch (error: any) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Failed to update category.' });
  }
});

categoryRouter.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Failed to delete category.' });
  }
});

export default categoryRouter;