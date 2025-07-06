const nodemailer = require("nodemailer");

const sendEmail = async ({ name, email, phone, preferredDate }) => {
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
    <div style="
      font-family: 'Segoe UI', Tahoma, sans-serif;
      background-color: #f8f8f8;
      padding: 40px;
    ">
      <div style="
        max-width: 650px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        border: 1px solid #e9ecef;
        padding: 35px;
        color: #111111;
      ">
        <h2 style="
          color: #d4af37;
          border-bottom: 1px solid #e9ecef;
          padding-bottom: 10px;
          margin-bottom: 25px;
          text-align: center;
          font-weight: 600;
        ">
          Mechanical Engineering Internship Registration
        </h2>

        <table style="width: 100%; font-size: 16px; border-collapse: collapse;">
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

        <div style="
          margin-top: 30px;
          background-color: rgba(212, 175, 55, 0.1);
          border-left: 4px solid #d4af37;
          padding: 20px;
          border-radius: 8px;
          color: #222222;
          line-height: 1.6;
        ">
          <strong style="display: block; margin-bottom: 10px;">Message:</strong>
          I would like to register for the Mechanical Engineering Internship. Please let me know the next steps and any further details required.
        </div>

        <p style="
          margin-top: 40px;
          font-size: 13px;
          color: #6c757d;
          text-align: center;
        ">
          This email was generated automatically by the Internship Registration System.<br>
          If you did not request this, please disregard this message.
        </p>
      </div>
    </div>
  `
});

};

module.exports = sendEmail;
