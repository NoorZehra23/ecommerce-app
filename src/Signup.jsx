import React from 'react'
import { Input, Space } from 'antd';
import { useFormik } from "formik";
import * as Yup from "yup";
import { LockOutlined, MailOutlined,PhoneOutlined,UserOutlined } from '@ant-design/icons';
import{ Button } from"antd";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from './firebase';

const initialValues = {
    name: "",
    email: "",
    phoneNumber:"",
    password: "",
    confirmPassword: "",
  };

  const validatephoneNumber = (number) => {
    const regex = /^(0|\+92)\d{10}$/;
    return regex.test(number);
  }
  
  const validatePassword = (value) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    return regex.test(value);
  };  


  const signUpSchema = Yup.object({
    name: Yup.string().min(2).max(25).required("Please Enter your Name."),
    email: Yup.string().email().required("Please enter your Email."),
    phoneNumber:Yup.string().required("Please enter your phone number").
    test('phoneNumber', 'Please enter an 11 digit phone number 03xx-xxxxxxxx', validatephoneNumber)    ,
    password: Yup.string().required("Please enter your Password.")    
    .test('password', 'Weak password. Please ensure your password has at least 6 characters, including one uppercase letter, one lowercase letter, one digit, and one special character.', validatePassword),
    confirmPassword: Yup.string()
      .required("Please re-enter you password")
      .oneOf([Yup.ref("password"), null], "Password must match."),
    
  });


export default function SignUp() {
    const auth=getAuth(app);
    const createUser=()=>{
        createUserWithEmailAndPassword(auth,values.email,values.password).then((value=>alert('Success')))
      }

    const { values, errors, touched, handleBlur, handleChange,handleSubmit } =useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        console.log( values);
        action.resetForm();
        createUser();
      },
    });


    
    
    return (
    <div>
     <form onSubmit={handleSubmit} >
    <Space direction="vertical">
      <Input placeholder="username" prefix={<UserOutlined />} id='name' value={values.name} onChange={handleChange} onBlur={handleBlur}/>
                      {errors.name && touched.name ? (
                          <p>{errors.name}</p>
                      ) : null}
      <Input placeholder="email" prefix={< MailOutlined/>} id='email' value={values.email} onChange={handleChange} onBlur={handleBlur} />
      {errors.email && touched.email ? (
                          <p>{errors.email}</p>
                      ) : null}

      <Input placeholder="phone" prefix={< PhoneOutlined/>} id='phoneNumber' value={values.phoneNumber} onChange={handleChange} onBlur={handleBlur}/>
      {errors.phoneNumber && touched.phoneNumber ? (
                          <p >{errors.phoneNumber}</p>
                      ) : null}

      <Input.Password placeholder="input password"  prefix={< LockOutlined/>} id='password'value={values.password} onChange={handleChange} onBlur={handleBlur}/>      
      {errors.password && touched.password ? (
                          <p >{errors.password}</p>
                      ) : null}

      <Input.Password placeholder="input password"  prefix={< LockOutlined/>} id='confirmPassword' value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur}/>      
      {errors.confirmPassword && touched.confirmPassword ? (
                          <p >{errors.name}</p>
                      ) : null}

      <Button type="primary" htmlType="submit">Submit</Button>
    </Space>
    
        </form>
    </div>
  )
}