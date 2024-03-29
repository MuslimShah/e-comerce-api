const sendEmail = require("./sendEmail");

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const a = "#";
  const verifyEmail = `${origin}/user/verify-email?verificationToken=${verificationToken}&email=${email}`;
  const message = `<p>Please confirm your email by clicking the following link: 
  <a href="${verifyEmail}">Click Here</a></p>`;

  return sendEmail({
    to: email,
    subject: "Verification Email",
    html: `
      <h1>Hello ${name}!</h1>
      ${message}
    `,
  });
};

module.exports = sendVerificationEmail;
