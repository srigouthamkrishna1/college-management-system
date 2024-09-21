const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxLength: 30
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    },
    role: {
        type: String,
        
    },
    department: {
        type: String,
        // enum: ['Computer Science And Engineering', 'Electronics and Communication Engineering', 'Mechanical Engineering', 'Civil Engineering'],
        
    }



}, {
    timestamps: true
})


const userModel = mongoose.model('User', userSchema);

module.exports = userModel;