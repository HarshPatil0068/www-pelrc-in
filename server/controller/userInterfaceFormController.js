const nodemailer = require("nodemailer");
const Contact = require("../models/userInterfaceFormModel");

const sendUserInterfaceRegForm = async (req, res) => {
  const { name, email, phone, message} = req.body;

  try {
    await Contact.create({ name, email, phone, message});

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `<${email}>`,
      to: process.env.EMAIL_USER,
      subject: `Graphics Designer Registration${email}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Inquiry Message:</strong><br>${message}</p>
      `,
    });

    res.redirect('/userInterfaceInternship?status=success');
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { sendUserInterfaceRegForm };