import React from "react";
import { useWorkoutContext } from "../../hooks/useWorkoutsContext";
import "./WorkoutDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function WorkoutDetails({ workout }) {
  const { dispatch } = useWorkoutContext();
  const handleClick = async () => {
    const response = await fetch(
      "http://localhost:4000/api/workouts/" + workout._id,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  const lastUploaded = formatDistanceToNow(new Date(workout.createdAt), {
    addSuffix: true,
  });

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>{lastUploaded}</p>
      <button className="deleteBtn" onClick={handleClick}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
}
