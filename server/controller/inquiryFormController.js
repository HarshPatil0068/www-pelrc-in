const sendEmail = require("../utils/sendInquiryEmail");

const sendInquiryEmail = async (req, res) => {
  console.log("Incoming request body:", req.body); // ✅ log

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await sendEmail({ name, email, message });
    res.status(200).json({ message: "Email sent successfully" });onsole.log("Email successfully sent");
    
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { sendInquiryEmail };
