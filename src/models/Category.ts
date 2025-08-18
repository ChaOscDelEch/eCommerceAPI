import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{type: String, required: true},
});

export default mongoose.model("Category", categorySchema);

// This file defines a simple User model with a name field.
// It can be extended with more fields as needed in the future.
// The model is exported for use in other parts of the application.

