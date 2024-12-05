const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  exercise: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  sets: {
    type: Number,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  dayOfWeek: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    required: true,
  },
  type_: {
    type: String,
    enum: ["goal", "track"],
    required: true,
  },
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
