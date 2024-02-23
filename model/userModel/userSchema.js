const mongoose = require('mongoose');

const UserSchema =  mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required']
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be 6 characters or longer']
    },

    email: {
        type: String,
        trim: true,
        required: [true, 'Email is required']
    },
  
});

module.exports = mongoose.model('User', UserSchema);







