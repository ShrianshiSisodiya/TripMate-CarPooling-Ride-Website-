const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail', // or your chosen email service
  auth: {
    user: process.env.EMAIL_USER, // Your email ID
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

const sendMail = (to, subject, text, html) => {
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  });
};

module.exports = sendMail;
