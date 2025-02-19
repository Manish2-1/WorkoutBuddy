// "type": "module", yo package.json ma rakhyo bhane server.js ma import express from express garera use garna milxa


require ('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const workoutRoutes = require('./routes/workouts.routes');
const userRoutes = require('./routes/userRoutes');



// express application 
const app = express();

app.use(cors());


//middleware
app.use(express.json());

app.use((req, res, next)=>{
    console.log(req.path, req.method);
    next();
})

// routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/users', userRoutes);

// // listen for port 
// app.listen(4000,()=>console.log("Server is running"))

// app.listen(process.env.PORT, () => console.log('Server is running on port', process.env.PORT));

//connect to database
mongoose.connect(process.env.MONGO_URI)

.then(()=>{
    app.listen(process.env.PORT, () => console.log('Connected to db & Server is running on port', process.env.PORT));
})

// .catch(err => console.log(err));
.catch(err => console.error(err));
