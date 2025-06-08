import { Request, Response } from "express";
import { User } from "../../entity/User";
import * as yup from "yup";

const schema = yup.object({
  body: yup.object({
    email_id: yup.string().required(),
  }),
});

export default async (req: Request, res: Response) => {
  try {
    await schema.validate(req);
  } catch (error: any) {
    return res.status(400).send(error.errors);
  }

  let user;

  try {
    // Decode base64 data
const decodedemail= Buffer.from(req.body.email_id , 'base64').toString('utf-8');
console.log('Decoded:', decodedemail);
    user = await User.findOneOrFail({ where: { email: decodedemail } });
  } catch (error) {
    return res.status(400).send("Oops!!!, User Not Found or link might be invalid");
  }
  if(user.verified === true){
    return res.send("User is Already Verified");
  }
  if (user.otp == req.body.otp){
        user.verified = true;
        user.otp = "";
  }
  else{
    return res.status(400).send("Invalid OTP");
  }

  await User.save(user);

  return res.send({ user });
};
