const sendEmail = require("../utils/sendUserInterfaceRegEmail");

const sendUserInterfaceRegEmail = async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    await sendEmail({ name, email, phone, message });
    res.redirect('/?status=success');
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {sendUserInterfaceRegEmail};
