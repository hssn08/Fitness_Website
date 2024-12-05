const mongoose = require("mongoose");

// Define the Exercise schema
const exerciseLibrarySchema = new mongoose.Schema({
  name: String,
  type: String,
  muscle: String,
  equipment: String,
  difficulty: String,
  instructions: String,
  image: String,
});

// Create and export the Exercise model
module.exports = mongoose.model("Exercise", exerciseLibrarySchema);
