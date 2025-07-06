const sendEmail = require("../utils/sendCNCProgrammingRegEmail");

const sendCNCProgrammingRegEmail = async (req, res) => {
  const { name, email, phone, preferredDate } = req.body; // ✅ Corrected

  try {
    await sendEmail({ name, email, phone, preferredDate }); // ✅ All values now passed
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { sendCNCProgrammingRegEmail };
