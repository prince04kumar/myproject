// /models/Project.js - Project model schema
import mongoose from 'mongoose';

// Check if Project model already exists to prevent overwrite in development
const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this project'],
    maxlength: [60, 'Title cannot be more than 60 characters'],
  },
  category: {
    type: String,
    required: [true, 'Please specify the project category'],
    maxlength: [40, 'Category cannot be more than 40 characters'],
  },
  image: {
    type: String,
    default: '/api/placeholder/400/320',
  },
  alt: {
    type: String,
    required: [true, 'Please provide alt text for accessibility'],
  },
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);