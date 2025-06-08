import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Formik } from "formik";
import { RouteProps } from "react-router";
import LoginLayout from "../layouts/Login";
import * as Yup from "yup";
import axios from "../axios";
import { AuthContext } from "../contexts/Auth";
import { toastConfig } from "../constants/toast.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(3).required("Required"),
});

const Login = (props: RouteProps): JSX.Element => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);
  if (loading) {
    return (
      <div className="loading-container">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Spinner spinning={loading} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <LoginLayout>
        <div className="form-container">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              setLoading(true);
              axios
                .post("/auth/login", { ...values })
                .then((res) => {
                  authContext.authenticate(res.data.user, res.data.accessToken);
                  setLoading(false);
                })
                .catch((err) => {
                  let error = err.message;
                  if (err?.response?.data) {
                    error = err.response.data;
                  }
                  toast.error(error, toastConfig);
                  setLoading(false);
                });
            }}
          >
            {({ errors, touched, getFieldProps, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="input-container">
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    {...getFieldProps("email")}
                  />
                  <div className="form-error-text">
                    {touched.email && errors.email ? errors.email : null}
                  </div>
                </div>

                <div className="input-container">
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    {...getFieldProps("password")}
                  />
                  <div className="form-error-text">
                    {touched.password && errors.password
                      ? errors.password
                      : null}
                  </div>
                </div>

                <button className="login-button button-primary" type="submit">
                  Login
                </button>
              </form>
            )}
          </Formik>

          <div className="form-info-text">Forgot Password?</div>

          <hr />

          <button
            onClick={() => navigate("/signup")}
            className="button-secondary"
          >
            Create a New Account
          </button>
        </div>
      </LoginLayout>
    </div>
  );
};

export default Login;
