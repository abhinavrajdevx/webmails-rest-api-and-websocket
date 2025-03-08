const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: "support@auxaty.com",
    pass: "Auxaty@500",
  },
});

const mailOptions = {
  from: '"Auxaty Support" <support@auxaty.com>',
  to: "abhinavrajdevx@gmail.com",
  subject: "Hello from Webmail Automation",
  text: "This is a test email sent from my webmail automation.",
};

transporter.sendMail(mailOptions, (error: any, info: { response: any }) => {
  if (error) {
    return console.error("Error:", error);
  }
  console.log("Email sent:", info.response);
});
