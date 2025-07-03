// Importing the dependencies.
const mongoose = require('mongoose');

// Creating the connection.
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Database connection failed:", err);
        process.exit(1);
    }
};

// Exporting the connection.
module.exports = dbConnection;
