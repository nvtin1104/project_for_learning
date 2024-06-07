import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASSWORD
  }
});

export const handleSendMail = async ({
                                       to,
                                       subject,
                                       text,
                                       html
                                     }) => {
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: html // html body
  });
  return info.messageId;
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
};
