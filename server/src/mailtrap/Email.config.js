import nodemailer from "nodemailer";
import { Welcome_Email_Template } from "../lib/Email.template.js";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "syedshaikshavali330@gmail.com",
    pass: "iqdw xatr hivw ccqr",
  },
});

export const SendMail = async (email, name) => {
  try {
    const info = await transporter.sendMail({
      from: '" Freshpick" <syedshaikshavali330@gmail.com>',
      to: email,
      subject: "Hello ✔",
      text: "Hello world?",
      html: Welcome_Email_Template.replace("{name}", name),
    });
    console.log(info);
  } catch (error) {
    console.log(error);
  }
};
