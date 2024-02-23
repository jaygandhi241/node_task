const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user:  {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    title: {
        type: String,
        required: [true, 'Please enter a title'],
    },
   
    description:{
        type:String,
        required: [true, 'Please enter a desciption'],
    },
    
    status: {
        type: String,
        default: 'active'
    },
    },
    {timestamp:true});

module.exports = mongoose.model('Task', taskSchema);