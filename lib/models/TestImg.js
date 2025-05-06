import mongoose from 'mongoose';

// Check if the model already exists to prevent OverwriteModelError
const TestimageSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true // Changed from just 'required: true' to proper format
  },
  Description: {
    type: String,
    required: true // Changed from just 'required: true' to proper format
  },
  Image: {
    data: Buffer,
    contentType: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Use mongoose.models to check if the model is already defined
const Testimage = mongoose.models.Testimage || mongoose.model('Testimage', TestimageSchema);

export default Testimage;