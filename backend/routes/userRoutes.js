const express = require("express");
const router = express.Router();
const Workout = require("../models/WorkOutModel");
const ExcerciseLib = require("../models/ExcerciseLibraryModel"); // Import the Workout model

router.get("/", (req, res) => {
  res.send("Welcome to the home page!");
});

router.get("/workoutTracking", async (req, res) => {
  try {
    // Fetch all exercises from the Workout model
    const allExercises = await Workout.find(); // Fetch all exercises
    res.status(200).json(allExercises);
  } catch (error) {
    console.error("Error fetching workout data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/goalSetting", async (req, res) => {
  try {
    // Fetch all workout documents where type_ is "goal"
    const workouts = await Workout.find({ type_: "goal" });
    res.json(workouts);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred while fetching workout data.");
  }
});

router.get("/exerciseLibrary", (req, res) => {
  res.send("Explore our exercise library here.");
});

router.get("/goalSetting", (req, res) => {
  res.send("Set your fitness goals here.");
});

router.get("/about", (req, res) => {
  res.send("Learn more about our website.");
});

router.post("/goalSetting", async (req, res) => {
  try {
    const { exercise, weight, sets, reps, dayOfWeek } = req.body;

    // Create a new workout document
    const newWorkout = new Workout({
      exercise,
      weight,
      sets,
      reps,
      dayOfWeek,
      type_: "goal", // Assuming it's a "goal" type
    });

    // Save the workout data to the database
    await newWorkout.save();
    res.send("Workout added successfully.");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred while adding workout data.");
  }
});

router.put("/goalSetting/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { exercise, weight, sets, reps, dayOfWeek } = req.body;

    // Find the workout document by ID and update it
    const updatedWorkout = await Workout.findByIdAndUpdate(id, {
      exercise,
      weight,
      sets,
      reps,
      dayOfWeek,
    });

    // Check if the document was found and updated
    if (!updatedWorkout) {
      return res.status(404).send("Exercise not found");
    }
    res.send("Exercise updated successfully");
  } catch (error) {
    console.error("Error updating exercise:", error);
    res.status(500).send("An error occurred while updating exercise");
  }
});

router.delete("/goalSetting/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Find the workout document by ID and delete it
    await Workout.findByIdAndDelete(id);

    res.send("Workout deleted successfully.");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred while deleting workout data.");
  }
});
router.post("/favorites", async (req, res) => {
  try {
    const exercise = new ExcerciseLib(req.body);
    //console.log(exercise);
    await exercise.save();
    res.status(201).send(exercise);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get favorite exercises
router.get("/favorites", async (req, res) => {
  try {
    const exercises = await ExcerciseLib.find();
    res.status(200).send(exercises);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/favorites/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await ExcerciseLib.findByIdAndDelete(id);
    res.status(200).send({ message: "Exercise deleted successfully" });
  } catch (error) {
    console.error("Error deleting exercise:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// POST route to store or update exercise information
router.post("/workoutTracking", async (req, res) => {
  const { trackedExercise } = req.body; // Get the single tracked exercise data
  console.log(trackedExercise);

  try {
    const { exercise, dayOfWeek, type_, ...exerciseData } = trackedExercise;

    // Check if exercise exists with the same name, day, and type
    const existingExercise = await Workout.findOneAndUpdate(
      { exercise, dayOfWeek, type_ },
      { $set: exerciseData },
      { new: true }
    );

    if (existingExercise) {
      // Update existing exercise with new data
      console.log("Exercise already exists, updating...");
      await Workout.updateOne(
        { exercise, dayOfWeek, type_ },
        { $set: exerciseData }
      );
    } else {
      // Create new exercise if it doesn't exist
      console.log("Exercise does not exist, creating...");
      await Workout.create({
        exercise,
        dayOfWeek,
        type_,
        ...exerciseData,
      });
    }

    res.status(200).json({ message: "Exercise data stored successfully." });
  } catch (error) {
    console.error("Error storing exercise data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
