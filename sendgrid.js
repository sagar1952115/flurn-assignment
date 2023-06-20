require("dotenv").config();

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_KEY);

const sendMail = async (msg) => {
  try {
    await sgMail.send(msg);
    console.log("Message sent successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendMail;
