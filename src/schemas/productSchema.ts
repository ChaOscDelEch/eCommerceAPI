import { z } from "zod";

export const productSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().min(0, "Price must be a positive number"),
    categoryId: z.string().optional(),
    images: z.array(z.string().min(1, "Image URL is required")),
})