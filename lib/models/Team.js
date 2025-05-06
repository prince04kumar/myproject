// /models/Project.js - Project model schema
import mongoose from 'mongoose';

// Check if Project model already exists to prevent overwrite in development
const TeamSchema = new mongoose.Schema({
  title:{
    type:String,
    required:[true,'Please provide a title for this project'],
},
image:{
    data:Buffer,
    contentType:String,
   
},
description:{
    type:String,
    required:[true,'Please provide alt text for accessibility'],
},

});

export default mongoose.models.Team || mongoose.model('Team', TeamSchema);