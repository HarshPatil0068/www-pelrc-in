// Importing the dependencies.
const mongoose = require("mongoose");

// Creating the connection.
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    process.exit(1);
  }
};

// Exporting the connection.
module.exports = dbConnection;
