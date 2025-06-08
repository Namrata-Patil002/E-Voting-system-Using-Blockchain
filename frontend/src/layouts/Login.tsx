import React from "react";
import { useNavigate } from "react-router";
import BackButton from "../components/Back";

interface LayoutProps {
  error?: string;
  children: JSX.Element;
}

const Login = (props: LayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="login-layout-wrapper">
      <div className="left">
        <BackButton call={() => navigate("/")} />

        <div className="title-large title-green">Blockchain Based</div>
        <div className="title-large title-green">Voting System</div>
        <div className="title-small">the future of voting</div>
      </div>

      <div className="right">
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default Login;
