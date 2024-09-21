const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  instructor: { type: String, required: true },
  semester: { type: String, required: true },
  department: { type: String, required: true }
});

module.exports = mongoose.model('Course', CourseSchema);