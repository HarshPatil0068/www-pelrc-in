const sendEmail = require("../utils/sendWebDevRegEmail");

const sendWebDevRegEmail = async (req, res) => {
  const { name, email, phone, preferredDate } = req.body;

  try {
    await sendEmail({ name, email, phone, preferredDate });
    res.status(200).json({ message: "Application sent successfully" });
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {sendWebDevRegEmail};