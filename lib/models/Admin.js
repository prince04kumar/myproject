// /models/Admin.js - Admin model schema
import mongoose from 'mongoose';

// Check if Admin model already exists to prevent overwrite in development
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email for this admin'],
    maxlength: [60, 'Email cannot be more than 60 characters'],
  }
});

export default mongoose.models.Admin || mongoose.model('Admin', adminSchema);