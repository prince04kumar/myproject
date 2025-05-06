import mongoose from 'mongoose';

const newProjectSchema = new mongoose.Schema({
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



})

export default mongoose.models.NewProject || mongoose.model('NewProject', newProjectSchema);    