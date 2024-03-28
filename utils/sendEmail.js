const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");

const mailerSend = new MailerSend({
  apiKey: process.env.ACCESS_TOKEN,
});
const sentFrom = new Sender(
  "info@trial-0r83ql3jnqmgzw1j.mlsender.net",
  "Muslim shah"
);

const sendEmail = async (user) => {
  const recipients = [new Recipient(user.email, "Recipient")];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject("Email Verification")
    .setHtml(
      `<strong>Verify email</strong><br>
      <strong>VerificationToken:</strong>
      <code>${user.verificationToken}</code>`
    )
    .setText("This is the text content");

  await mailerSend.email.send(emailParams);
};

module.exports = sendEmail;
