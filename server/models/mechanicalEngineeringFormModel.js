const mongoose = require("mongoose");

const mechanicalEngineeringForm = new mongoose.Schema({
  name: String,
  email: String,
  phone : Number,
  preferredDate: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("mech_engineering_form", mechanicalEngineeringForm);
