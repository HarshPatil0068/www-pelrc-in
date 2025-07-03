const mongoose = require("mongoose");

const webDevelopmentForm = new mongoose.Schema({
  name: String,
  email: String,
  phone : Number,
  preferredDate: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("web_devlopement_form", webDevelopmentForm);
