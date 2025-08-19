import { Schema, model } from 'mongoose';

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required."],
    },
    image: {
        type: String,
        required: [true, "Image is required."],
    },
    content: {
        type: String,
        required: [true, "Content is required."],
    },
    author : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    categories : {
        type: [String],
        default: [],
    },
}
, { timestamps: true}
);

export default model('Post', postSchema);