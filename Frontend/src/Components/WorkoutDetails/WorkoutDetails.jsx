import React from "react";
import { FaDumbbell, FaCalendarAlt } from "react-icons/fa";
import { MdFitnessCenter, MdDelete } from "react-icons/md";
import { BiDetail } from "react-icons/bi";
import { useWorkoutsContext } from "../../Hooks/UseWorkoutContext";
import { useAuthContext } from "../../Hooks/UseAuthContext";
import { toast } from "react-toastify";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      toast.error("Please sign in to delete a workout.");
      return;
    }

    const response = await fetch(
      `http://localhost:4000/api/workouts/${workout._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`, // Send the token in the headers
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    dispatch({ type: "DELETE_WORKOUT", payload: { _id: workout._id } });
  };

  const formattedDate = new Date(workout.createdAt).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-br from-purple-200 via-indigo-200 to-blue-200 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-transform duration-300 transform hover:scale-105 relative overflow-hidden">
      <span
        className="absolute top-4 right-4 bg-red-600 text-white p-3 rounded-full cursor-pointer shadow-md hover:bg-red-700 transition duration-300"
        onClick={handleClick}
      >
        <MdDelete className="text-2xl" />
      </span>

      <div className="flex items-center space-x-4 mb-6">
        <MdFitnessCenter className="text-indigo-700 text-5xl" />
        <h1 className="text-gray-900 text-3xl font-extrabold tracking-wide">
          {workout.title}
        </h1>
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <BiDetail className="text-blue-600 text-3xl" />
        <p className="text-gray-800 text-lg">
          <span className="font-semibold">Reps:</span> {workout.reps}
        </p>
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <FaDumbbell className="text-green-700 text-3xl" />
        <p className="text-gray-800 text-lg">
          <span className="font-semibold">Load:</span> {workout.load} kg
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <FaCalendarAlt className="text-yellow-600 text-3xl" />
        <p className="text-gray-800 text-lg">
          <span className="font-semibold">Created At:</span> {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default WorkoutDetails;
