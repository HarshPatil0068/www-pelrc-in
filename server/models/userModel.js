// Importinf the dependencies.
const mongoose = require("mongoose");

// Defining the user registartion schema.
const userRegisterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  contactNo: { type: Number, required: true , minlength:10, maxlength:12},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 7 },
});

// Exporting the user registration schema.
module.exports = mongoose.model("user", userRegisterSchema);