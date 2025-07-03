const mongoose = require("mongoose");

const graphicsDesignForm = new mongoose.Schema({
  name: String,
  email: String,
  phone : Number,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("graphics_form", graphicsDesignForm);
