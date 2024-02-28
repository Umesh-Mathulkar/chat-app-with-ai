import mongoose from 'mongoose';

// Define the schema for a comment
const CommentSchema = new mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: true }
}, { timestamps: true });

// Define the schema for an image post
const ImagePostSchema = new mongoose.Schema({
  imagePath: { type: String, required: true },
  caption: { type: String, default: '' },
  likes: { type: Number, default: 0 },
  comments: [CommentSchema]
}, { timestamps: true });

// Compile the schema into a model and export it
const ImagePost = mongoose.models.ImagePost || mongoose.model('ImagePost', ImagePostSchema);

export default ImagePost;
