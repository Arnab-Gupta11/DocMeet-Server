import nodemailer from 'nodemailer';
import config from '../config';
type TEmailInfo = {
  to: string;
  subject: string;
  html: string;
};
export const sendEmail = async (emailInfo: TEmailInfo) => {
  const transporter = nodemailer.createTransport({
    host: config.email.email_host,
    port: Number(config.email.email_port),
    secure: config.node_env === 'production',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: config.email.email_user,
      pass: config.email.email_pass,
    },
  });

  await transporter.sendMail({
    from: config.email.email_from, // sender address
    to: emailInfo.to, // list of receivers
    subject: emailInfo.subject, // Subject line
    html: emailInfo.html, // html body
  });
};
