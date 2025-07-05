const nodemailer = require("nodemailer");
const Contact = require("../models/mechanicalEngineeringFormModel");

const sendMechEngRegForm = async (req, res) => {
  const { name, email, phone, preferredDate } = req.body;

  try {
    await Contact.create({ name, email, phone, preferredDate });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
  from: `"${name}" <${email}>`,
  to: process.env.EMAIL_USER,
  subject: "Mechanical Engineering Internship Registration",
  html: `
    <div style="font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); padding: 30px; border: 1px solid #e0e0e0;">
      
      <h2 style="color: #1a237e; text-align: center; margin-bottom: 20px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
        Mechanical Engineering Internship Registration
      </h2>

      <table style="width: 100%; font-size: 16px; color: #333; border-collapse: collapse;">
        <tr>
          <td style="font-weight: 600; padding: 10px 0; width: 160px;">Full Name:</td>
          <td>${name}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; padding: 10px 0;">Email Address:</td>
          <td>${email}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; padding: 10px 0;">Phone Number:</td>
          <td>${phone}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; padding: 10px 0;">Preferred Date:</td>
          <td>${preferredDate}</td>
        </tr>
      </table>

      <div style="margin-top: 30px;">
        <h3 style="margin-bottom: 10px; font-size: 17px; color: #222;">Message:</h3>
        <div style="background-color: #f4f6f8; padding: 15px 20px; border-left: 4px solid #1a237e; border-radius: 4px; color: #555; line-height: 1.6;">
          I would like to register for the Mechanical Engineering Internship. Please let me know the next steps and any further details required.
        </div>
      </div>

      <p style="margin-top: 40px; font-size: 13px; color: #777; text-align: center;">
        This email was generated automatically by the Internship Registration System.<br>
        If you did not request this, please disregard this message.
      </p>
    </div>
  `
});


    // AJAX request
    res.redirect("/mechanicalInternship?status=success");
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { sendMechEngRegForm };
