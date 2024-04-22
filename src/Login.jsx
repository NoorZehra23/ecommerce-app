import React from 'react'
import { Input, Space } from 'antd';
import { useFormik } from "formik";
import * as Yup from "yup";
import { LockOutlined, MailOutlined,PhoneOutlined,UserOutlined } from '@ant-design/icons';
import{ Button } from"antd";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from './firebase';

const initialValues = {
    email: "",
    password: "",
  };



  const loginSchema = Yup.object({
    email: Yup.string().email().required("Please enter your Email."),
    password: Yup.string().required("Please enter your Password.")        
  });


export default function Login() {
    const auth=getAuth(app);
    const loginUser=()=>{
      signInWithEmailAndPassword(auth,values.email,values.password).then((value=>alert('Success'))).catch((err)=>console.log(err))
      }

    const { values, errors, touched, handleBlur, handleChange,handleSubmit } =useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: (values, action) => {
          action.resetForm();
        loginUser();

      },
    });


    
    
    return (
    <div>
     <form onSubmit={handleSubmit} >
    <Space direction="vertical">
      <Input placeholder="email" prefix={< MailOutlined/>} id='email' value={values.email} onChange={handleChange} onBlur={handleBlur} />
      {errors.email && touched.email ? (
                          <p>{errors.email}</p>
                      ) : null}

      <Input.Password placeholder="input password"  prefix={< LockOutlined/>} id='password'value={values.password} onChange={handleChange} onBlur={handleBlur}/>      
      {errors.password && touched.password ? (
                          <p >{errors.password}</p>
                      ) : null}
      <Button type="primary" htmlType="submit">Login</Button>
    </Space>
    
        </form>
    </div>
  )
}


