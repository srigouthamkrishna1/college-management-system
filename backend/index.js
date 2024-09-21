const express = require('express');
const app = express();
const mongoose=require('mongoose');
const cors=require('cors');
const userRoute=require('./routes/userRoute');
const courseRoutes = require('./routes/coursesRoute.js');
const dotenv=require('dotenv');
dotenv.config();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.log(err);
});
app.use('/api/users',userRoute);
app.use('/api/courses', courseRoutes);
app.listen(process.env.PORT||3001,()=>{
    console.log("Server is running on port 3001");
});

