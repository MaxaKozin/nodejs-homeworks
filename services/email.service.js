const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.MAIL_SENDER_KEY);

const sendVerificationEmail = async (email, token) => {
  try {
    const msg = {
      to: email,
      from: process.env.SENDER,
      subject: "Email verification",
      text: "Please verify your email",
      html: `<a href=${
        process.env.HOST + ":" + process.env.PORT + "/auth/verify/" + token
      }>Click here to verify</a>`,
    };
    sgMail.send(msg).then(() => {
      console.log("email sent");
    });
  } catch (err) {
    return console.log(err);
  }
};

module.exports = {
  sendVerificationEmail,
};
