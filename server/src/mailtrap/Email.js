import { transporter } from "./Email.config.js";
import {
  Verification_Email_Template,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
} from "../lib/Email.template.js";

export const SenderVerificationCode = async (email, verificationCode) => {
  try {
    const response = await transporter.sendMail({
      from: '" Freshpick" <syedshaikshavali330@gmail.com>',
      to: email,
      subject: "Verification 🪽",
      text: "Hello world?",
      html: Verification_Email_Template.replace(
        "{verificationCode}",
        verificationCode
      ),
    });
    console.log("Email send sucessesful", response);
  } catch (error) {
    console.log(error);
  }
};

export const sendPasswordresetEmail = async (email, resetURL) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: '" Freshpick" <syedshaikshavali330@gmail.com>',
      to: recipient,
      subject: "reset password ",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "password reset",
    });
    console.log("Password reset request email sent sucessfully", response);
  } catch (error) {
    console.error(`Error sending password reset successful`, error);
    throw new Error(`Error sending password reset sucessful email:${error}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: '" Freshpick" <syedshaikshavali330@gmail.com>',
      to: recipient,
      subject: "Password reset successful ",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "password reset",
    });
    console.log("Password reset email sent sucessfully", response);
  } catch (error) {
    console.error(`Error sending password reset`, error);
    throw new Error(`Error sending password reset email:${error}`);
  }
};
