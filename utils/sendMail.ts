const nodemailer = require('nodemailer');

export const sendEmail = async (to : any, subject : any, html : any) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Edu-Spur" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

