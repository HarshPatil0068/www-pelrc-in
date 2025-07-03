const nodemailer = require("nodemailer");
const Contact = require("../models/inquiryFormModel");

const sendInquiryMessage = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await Contact.create({ name, email, message });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Contacted through pelrc.in" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: `Inquiry from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Inquiry Message:</strong><br>${message}</p>
      `,
    });

    // AJAX request
    res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { sendInquiryMessage };
