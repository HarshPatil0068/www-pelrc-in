const nodemailer = require("nodemailer");

const sendInquiryEmail = async ({ name, email, message }) => {
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
  subject: `Enquiry from ${name}`,
  html: `
  <div style="
    background-color: #f8f8f8;
    padding: 40px;
    font-family: 'Segoe UI', Tahoma, sans-serif;
    color: #111111;
  ">
    <div style="
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      padding: 30px;
      border: 1px solid #e9ecef;
    ">
      <h2 style="
        color: #d4af37;
        border-bottom: 1px solid #e9ecef;
        padding-bottom: 10px;
        margin-bottom: 25px;
        font-weight: 600;
      ">
        New Inquiry from pelrc.in
      </h2>

      <table style="width: 100%; font-size: 16px; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; font-weight: 600; width: 140px;">Name:</td>
          <td>${name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: 600;">Email:</td>
          <td>${email}</td>
        </tr>
      </table>

      <div style="
        margin-top: 30px;
        background-color: rgba(212, 175, 55, 0.1);
        border-left: 4px solid #d4af37;
        padding: 20px;
        border-radius: 8px;
        color: #222222;
        line-height: 1.6;
      ">
        <strong style="display: block; margin-bottom: 10px;">Inquiry Message:</strong>
        ${message}
      </div>

      <p style="margin-top: 40px; font-size: 13px; color: #6c757d; text-align: center;">
        This message was sent from the inquiry form at <strong>www.pelrc.in</strong>.
      </p>
    </div>
  </div>
  `
}).catch(console.error);

};

module.exports = sendInquiryEmail;
