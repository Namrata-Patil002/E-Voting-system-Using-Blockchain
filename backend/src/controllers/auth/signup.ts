import { Request, Response } from "express";
import * as yup from "yup";
import { User } from "../../entity/User";
import bcrypt from "bcrypt";
import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer';


// Create a transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'jay431477@gmail.com',
        pass: 'huht gnux qrsk bybx'
    }
});





const schema = yup.object({
  body: yup.object({
    name: yup.string().min(3).required(),
    email: yup.string().email().required(),
    password: yup.string().min(3).required(),
    citizenshipNumber: yup.string().min(4),
  }),
});

export default async (req: Request, res: Response) => {
  try {
    await schema.validate(req);
  } catch (error: any) {
    return res.status(400).send(error.errors);
  }

  let hashedPassword = undefined;

  try {
    hashedPassword = await bcrypt.hash(req.body.password, 10);
  } catch (error) {
    return res.status(500).send({ error });
  }

  const newUser = new User();

// Generate OTP
const otp = otpGenerator.generate(6, {digits:true, lowerCaseAlphabets:true, upperCaseAlphabets:true})
  newUser.admin = false;
  newUser.name = req.body.name;
  newUser.email = req.body.email;
  newUser.password = hashedPassword;
  newUser.citizenshipNumber = req.body.citizenshipNumber;
  newUser.otp = otp;

  try {
    await User.save(newUser);
    // Define email options
    // Encode data to base64
const encodedemail = Buffer.from(req.body.email).toString('base64');



const mailOptions = {
  from: 'jay431477@gmail.com',
  to: req.body.email,
  subject: 'Your OTP',
  html: `<h3>Your OTP is:</h3><h2> ${otp}</h2><br/> <a href="http://localhost:3000/verifyOTP/${encodedemail}/">Click here</a> to Enter OTP and Verify the account.`
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
      console.error('Error:', error);
  } else {
      console.log('Email sent:', info.response);
  }
});
  } catch (error) {
    return res.status(400).send(error);
  }

  return res.send(newUser);
};
