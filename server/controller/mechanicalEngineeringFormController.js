const nodemailer = require("nodemailer");
const Contact = require("../models/mechanicalEngineeringFormModel");

const sendMechEngRegForm = async (req, res) => {
  const { name, email, phone, preferredDate} = req.body;

  try {
    await Contact.create({ name, email, phone, preferredDate});

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from:`<${email}>`,
      to: process.env.EMAIL_USER,
      subject: `Mechanical Engineering Registration`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>phone:</strong> ${phone}</p>
        <p><strong>Preferred Date:</strong> ${preferredDate}</p>
        <p><strong>Inquiry Message:</strong>I would like to register for this internship.<</p>
      `,
    });

    // AJAX request
    res.redirect('/mechanicalInternship?status=success');
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { sendMechEngRegForm };