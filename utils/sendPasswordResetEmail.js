const sendEmail = require("./sendEmail");

const sendPasswordResetEmail = async ({
  name,
  email,
  passwordToken,
  origin,
}) => {
  const a = "#";
  const resetUrl = `${origin}/user/reset-password?verificationToken=${passwordToken}&email=${email}`;
  const message = `<p>Please reset your password by clicking the following link: 
  <a href="${resetUrl}">Click Here</a></p>`;

  return sendEmail({
    to: email,
    subject: "Reset Password",
    html: `
      <h1>Hello ${name}!</h1>
      ${message}
    `,
  });
};

module.exports = sendPasswordResetEmail;
