// server.js
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const dbConnection = require("./config/db.js");
const checkUser = require("./middleware/authUser.js");

// Import Routes
const pageRoutes = require("./routes/pageRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const mailRoutes = require("./routes/mailRoutes.js");

dbConnection();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../client/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../client/views"));
app.use(checkUser);

// Route Usage
app.use("/", pageRoutes);
app.use("/auth", authRoutes);
app.use("/send/mail", mailRoutes);

// Server Start
app.listen(process.env.PORT || 3000);
