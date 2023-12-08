import { useContext } from "react";
import { WorkoutContext } from "../src/context/WorkoutContext";

import React from "react";

export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw Error("useworkoutcontext must be inside an workoutscontextprovider");
  }

  return context;
};
