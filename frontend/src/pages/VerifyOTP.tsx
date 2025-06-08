// EmailOtpPage.tsx

import React from 'react';
import '../styles/EmailotpPage.css'; // Import CSS file for styling
import {useNavigate, useParams} from 'react-router-dom'
import axios from "../axios";
import { Empty } from "antd";
import { toast } from "react-toastify";
import { toastConfig } from "../constants/toast.config";
import { useState } from 'react';
const EmailOtpPage =(): JSX.Element => {
    const {email} = useParams();
    const [otp, setOTP] = useState<string |undefined>();
    
    const navigate = useNavigate();

    const verifyUser = () => {
        axios
          .post("/users/otp/verify", { email_id: email, otp })
          .then((res) => {
            toast.success(res.data, toastConfig);
            navigate("/")
          })
          .catch((error) => {
            if(error.response.status === 400){
                toast.error(error.response.data, toastConfig);
            }
            else{
                throw new Error(error);
            }
          });
      };

    return (
        <div className="container">
            <h2>Please Enter OTP to Verify</h2>
            <div className="form-container">
                {/* <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Enter your email" />
                </div> */}
                <div className="form-group">
                    <label htmlFor="otp">OTP</label>
                    <input type="text" onChange={(e)=>{setOTP(e.target.value)}} id="otp" placeholder="Enter OTP" />
                </div>
                <button className="submit-btn" onClick={verifyUser}>Submit</button>
            </div>
        </div>
    );
};

export default EmailOtpPage;
