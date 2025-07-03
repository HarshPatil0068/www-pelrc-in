const mongoose = require("mongoose");

const userInterfaceForm = new mongoose.Schema({
  name: String,
  email: String,
  phone : Number,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user_interface_form", userInterfaceForm);
