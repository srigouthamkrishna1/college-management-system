const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

// Create a new course
router.post('/', async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.post('/enroll',async(req,res)=>{
  try{
    const body=req.body;
    console.log("here body is",body,req.query);
    const enrollment=new Enrollment(req.body);
    await enrollment.save();
    res.status(201).json(enrollment);
  }catch(error){
    res.status(400).json({message:error.message});
  }
})
router.delete('/enroll/delete', async (req, res) => {
  const { userId, courseId } = req.query;

  try {
    // Remove the enrollment record from the database
    const result = await Enrollment.findOneAndDelete({
      userId: userId,
      courseId: courseId,
    });

    if (!result) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    res.status(200).json({ message: 'Successfully unrolled from course' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to unroll from course' });
  }
});
router.get('/courseByInstructor',async(req,res)=>{
  try{
    const courses=await Course.find({instructor:req.query.instructor,department:req.query.department});
    res.json(courses);
  }catch(error){
    res.status(500).json({message:error.message});
  }
})
router.get('/enrolledcourses', async (req, res) => {
    const { userId} = req.query;
    console.log("here::",req.query);
  
    try {
      // Remove the enrollment record from the database
      const result = await Enrollment.find({
        userId: userId,
        
      });
  
      if (!result) {
        return res.status(404).json({ error: 'Enrollment not found' });
      }
  
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: 'Failed to unroll from course' });
    }
  });
router.get('/courseByDepartment/',async(req,res)=>{
  try{
    console.log("Here",req.query);
    const courses=await Course.find({department:req.query.department});
    console.log("Here",courses);
    res.json(courses);
  }catch(error){
    res.status(500).json({message:error.message});
  }
})

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a course by ID
router.put('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get('/enrolledStudents/', async (req, res) => {
  try {
    const courseId = req.query.courseId;
    const enrolledStudents = await Enrollment.find({ courseId: courseId });
    res.json(enrolledStudents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/coursesOfStudent/', async (req, res) => {
  try {
    const userId = req.query.userId;
    console.log("/////////////",userId);
    const courses = await Enrollment.find({ userId: userId });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Delete a course by ID
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;