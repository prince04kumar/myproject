// /models/Project.js - Project model schema
import mongoose from 'mongoose';

// Check if Project model already exists to prevent overwrite in development
const adminSchema = new mongoose.Schema({
  UserName: {
    type: String,
    required: [true, 'Please provide a title for this project'],
    maxlength: [60, 'Title cannot be more than 60 characters'],
  },
  Password: {
    type: String,
    required: [true, 'Please specify the project category'],
    maxlength: [40, 'Category cannot be more than 40 characters'],
  },
});

export default mongoose.models.admin || mongoose.model('adminSchema', adminSchema);