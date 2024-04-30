import React, { useState } from "react";
import { Input, Space, notification } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { database, auth } from "./firebase";
import { ref, set } from "@firebase/database";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser, setLoading, fetchUserDetails } from "./features/userSlice";
import { Spin } from "antd";
const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

const validatephoneNumber = (number) => {
  const regex = /^(0|\+92)\d{10}$/;
  return regex.test(number);
};

const validatePassword = (value) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  return regex.test(value);
};

const signUpSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please Enter your Name."),
  email: Yup.string().email().required("Please enter your Email."),
  phoneNumber: Yup.string()
    .required("Please enter your phone number")
    .test(
      "phoneNumber",
      "Please enter an 11 digit phone number 03xx-xxxxxxxx",
      validatephoneNumber
    ),
  password: Yup.string()
    .required("Please enter your Password.")
    .test(
      "password",
      "Weak password. Please ensure your password has at least 6 characters, including one uppercase letter, one lowercase letter, one digit, and one special character.",
      validatePassword
    ),
  confirmPassword: Yup.string()
    .required("Please re-enter you password")
    .oneOf([Yup.ref("password"), null], "Password must match."),
});

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postToDatabase = async (userId) => {
    try {
      await set(ref(database, "users/" + userId), {
        userid: userId,
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        password: values.password,
      });
      console.log("Data has been successfully saved to the database.");
    } catch (error) {
      console.error("Error writing data to the database:", error);
      alert(error);
    }
  };

  const createUser = async () => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      await postToDatabase(userCredential.user.uid).then(navigate("/"));
      console.log("User creation and data posting successful");
      dispatch(loginUser(userCredential.user));
      dispatch(fetchUserDetails(userCredential.user.uid));
    } catch (error) {
      console.error("Error:", error);
      alert(error);
    }
    setLoading(false);
  };

  //   const createUser = (values) => async (dispatch) => {
  //     try {
  //       setLoading(true);
  //       const userCredential = await createUserWithEmailAndPassword(
  //         auth,
  //         values.email,
  //         values.password
  //       );
  //       await postToDatabase(userCredential.user.uid);
  //       console.log("User creation and data posting successful");
  //       dispatch(loginUser(userCredential.user));
  //       dispatch(fetchUserDetails(userCredential.user.uid));
  //       navigate("/");
  //     } catch (error) {
  //       console.error("Error:", error);
  //       alert(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   const handleFormSubmit = async (values) => {
  //     try {
  //       dispatch(createUser(values));
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //     notification.success({
  //       message: "Success",
  //       description: "Successfully logged in.",
  //       placement: "topRight",
  //       duration: 2,
  //       stack: { threshold: 2 }, // You can adjust the position here
  //     });
  //   };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: () => {
        createUser();
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
            placeholder="username"
            prefix={<UserOutlined />}
            id="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && touched.name ? <p>{errors.name}</p> : null}
          <Input
            placeholder="email"
            prefix={<MailOutlined />}
            id="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email ? <p>{errors.email}</p> : null}

          <Input
            placeholder="phone"
            prefix={<PhoneOutlined />}
            id="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.phoneNumber && touched.phoneNumber ? (
            <p>{errors.phoneNumber}</p>
          ) : null}

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

          <Input.Password
            placeholder="input password"
            prefix={<LockOutlined />}
            id="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.confirmPassword && touched.confirmPassword ? (
            <p>{errors.name}</p>
          ) : null}

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </Space>
      </form>
    </div>
  );
}
