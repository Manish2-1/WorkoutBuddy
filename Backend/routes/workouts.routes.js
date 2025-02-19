const express = require('express');
const { createWorkout, getWorkout, getWorkoutById, deleteWorkout, updateWorkout } = require('../controllers/workoutController');


const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

//get,add,delete,update a route
router.post('/', createWorkout)

router.get('/',getWorkout)

router.get('/:id', getWorkoutById);

router.patch('/:id', updateWorkout);

router.delete('/:id', deleteWorkout)


//export the router
module.exports = router;