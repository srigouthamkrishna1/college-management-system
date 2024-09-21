const mongoose = require('mongoose');
const EnrollmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    courseName: { type: String, required: true },
    instructor: { type: String, required: true },
    department: { type: String, required: true },
    semester: { type: String, required: true },

  },{timestamps:true});
  module.exports = mongoose.model('Enrollment', EnrollmentSchema);