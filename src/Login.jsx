import React from "react";
import { Input, Space } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { setLoading, loginUser, fetchUserDetails } from "./features/userSlice";
import { fetchUserCart } from "./features/cartSlice";
import { useState } from "react";
import { Spin } from "antd";
const initialValues = {
  email: "",
  password: "",
};

const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter your Email."),
  password: Yup.string().required("Please enter your Password."),
});

export default function Login() {
  const [loading, setLoading] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = async () => {
    let userCredential;
    try {
      // dispatch(setLoading(true));
      setLoading(true);
      userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
    } catch (err) {
      console.log(err);
      alert("Error logging in", err);
      setLoading(false);
      // dispatch(setLoading(false));
    }
    if (userCredential) {
      dispatch(
        loginUser({
          userId: userCredential.user.uid,
          email: userCredential.user.email,
        })
      );
      dispatch(fetchUserCart(userCredential.user.uid));
      dispatch(fetchUserDetails(userCredential.user.uid));
      setLoading(false);
      // dispatch(setLoading(false));
      navigate("/cart");
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: () => {
        userLogin();
      },
    });

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Space direction="vertical">
          <Input
            placeholder="email"
            prefix={<MailOutlined />}
            id="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email ? <p>{errors.email}</p> : null}

          <Input.Password
            placeholder="input password"
            prefix={<LockOutlined />}
            id="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password ? (
            <p>{errors.password}</p>
          ) : null}
          <Button type="primary" htmlType="submit">
            Login
          </Button>
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </Space>
      </form>
    </div>
  );
}
