import nodemailer from 'nodemailer';

export const sendMail = async (to, subject,text) => {
    //first create a transporter to send the email
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_SMTP_HOST,
      port: process.env.MAILTRAP_SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAILTRAP_SMTP_USER,
        pass: process.env.MAILTRAP_SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from:'Ingest mail service: TMS',
      to,
      subject,
      text
    })

    console.log("sent Email", info.messageId);
  }
  catch (err) {
    console.error('Error:there is error while sending email', err.message);
  }
}

