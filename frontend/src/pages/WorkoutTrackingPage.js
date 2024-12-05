import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Box } from "@mui/material";
import GoalExerciseCard from "../components/GoalExerciseCard";
import exTrackingIcon from "../assets/icons/exTrackingIcon.png";

const WorkoutTracking = () => {
  const [goalExercises, setGoalExercises] = useState([]);
  const [currentDay, setCurrentDay] = useState("");
  const [trackedExercises, setTrackedExercises] = useState([]);
  const [alreadyTrackedExercises, setAlreadyTrackedExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/bfit/workoutTracking"
        );
        setGoalExercises(response.data); // Assuming response.data is an array of exercises
        setCurrentDay(getCurrentDay()); // Set the current day
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };
    fetchExercises();
  }, []);

  const getCurrentDay = () => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    const currentDayIndex = currentDate.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    return daysOfWeek[currentDayIndex];
  };

  const exercisesOfDay = goalExercises.filter((exercise) => {
    // Filter by dayOfWeek and ensure type_ is not "track"
    return exercise.dayOfWeek === currentDay && exercise.type_ !== "track";
  });

  const alreadyTrackedEx = goalExercises.filter((exercise) => {
    // Filter by dayOfWeek and ensure type_ is not "goal"
    return exercise.dayOfWeek === currentDay && exercise.type_ !== "goal";
  });

  useEffect(() => {
    // Update trackedExercises when exercisesOfDay changes
    setTrackedExercises(exercisesOfDay);
    setAlreadyTrackedExercises(alreadyTrackedEx);
  }, [exercisesOfDay]);

  return (
    <Box
      sx={{
        textAlign: "center",
        marginTop: "2rem",
        padding: "1rem",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        <img
          src={exTrackingIcon}
          alt="Exercise Tracking Icon"
          style={{
            width: 100,
            height: 100,
            marginRight: 10,
            backgroundColor: "orange",
            borderRadius: "50%",
          }}
        />
        <Typography variant="h4" gutterBottom>
          Track Your Workout
        </Typography>
      </Box>
      <Typography variant="h6" gutterBottom>
        Day: {currentDay}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Exercises:
      </Typography>
      {exercisesOfDay.length === 0 ? (
        <Typography variant="body1" gutterBottom>
          No Exercises Set Added for Today
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          {exercisesOfDay.map((exercise, index) => (
            <GoalExerciseCard
              key={index}
              exercise={exercise}
              trackedExercises={trackedExercises}
              setTrackedExercises={setTrackedExercises}
              alreadyTrackedExercises={alreadyTrackedExercises}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default WorkoutTracking;
