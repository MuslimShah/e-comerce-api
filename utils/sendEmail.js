const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");

const mailerSend = new MailerSend({
  apiKey: process.env.ACCESS_TOKEN,
});
const sentFrom = new Sender(process.env.SENDER_ID, process.env.SENDER_NAME);

const sendEmail = async ({ to, subject, html }) => {
  const recipients = [new Recipient(to, "Recipient")];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject(`${subject}`)
    .setHtml(`${html}`);
  // .setText("This is the text content");

  await mailerSend.email.send(emailParams);
};

module.exports = sendEmail;
