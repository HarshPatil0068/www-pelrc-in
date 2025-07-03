// Importing the dependencies
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/userModel.js");

// Registering a user.
const registerUser = async (req, res) => {
  const { name, location, contactNo, email, password } = req.body;

  try {
    const isUser = await user.findOne({ email });
    if (isUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await user.create({
      name,
      location,
      contactNo,
      email,
      password: hashedPassword,
    });

    // ✅ Redirect to login form after successful registration
    res.redirect("/auth?form=login");
  } catch (err) {
    console.error("Something went wrong.", err);
    res.status(500).send("Internal server error");
  }
};

// Logging in a user.
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isUser = await user.findOne({ email });
    if (!isUser) {
      return res.status(400).json({ message: "User does not exist." });
    }

    const isMatched = await bcrypt.compare(password, isUser.password);
    if (!isMatched) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    const token = jwt.sign(
      { useremail: email, userid: isUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "3d" }
    );

    res.cookie("token", token, { httpOnly: true });

    // ✅ Redirect to home page after successful login
    res.redirect("/");
  } catch (err) {
    console.error("Something went wrong.", err);
    res.status(500).send("Internal server error");
  }
};

module.exports = { registerUser, loginUser };
