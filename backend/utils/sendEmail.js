import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  try {

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"BloodCare Support" <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    await transporter.sendMail(mailOptions);

  } catch (error) {
    console.error("Email sending error:", error);
    throw new Error("Email could not be sent");
  }
};

export default sendEmail;