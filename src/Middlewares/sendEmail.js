import nodemailer from "nodemailer";
export const sendEmail = async (email,otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "elmghrby025@gmail.com",
      pass: "tqvbyxgmdjpsoyjm",
    },
  });

  const info = await transporter.sendMail({
    from: '"Ahmed maghraby" <elmghrby025@gmail.com>',
    to: email,
    subject: "Email Verification",
    html: `Your verify code is ${otp}`,
  });
};
