import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Typography } from "antd";
import { EditOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const { Text } = Typography;

const MyProfile = () => {
  const user = useSelector((state) => state.user.user);
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleSaveClick = (values) => {
    console.log("Form values:", values);
    // Handle save logic here, e.g., dispatch an action to update user details
    setEditMode(false);
  };

  return (
    <div>
      <h2>User Info</h2>
      <Formik
        initialValues={{
          name: user.name,
          phoneNumber: user.phoneNumber,
        }}
        enableReinitialize
        validate={(values) => {
          const errors = {};
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleSaveClick(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Text strong>Name</Text>
              {editMode ? (
                <Field type="text" name="name" />
              ) : (
                <Text>{user.name}</Text>
              )}
              <ErrorMessage name="name" component="div" />
            </div>
            <div>
              <Text strong>Email</Text>
              <Text>{user.email}</Text>
            </div>
            <div>
              <Text strong>Phone Number</Text>
              {editMode ? (
                <Field type="text" name="phoneNumber" />
              ) : (
                <Text>{user.phoneNumber}</Text>
              )}
              <ErrorMessage name="phoneNumber" component="div" />
            </div>
            <div>
              <Text strong>Password</Text>
              <Text>********</Text>
            </div>
            {editMode ? (
              <div>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={isSubmitting}
                  icon={<CheckOutlined />}
                >
                  Save
                </Button>
                <Button
                  type="default"
                  onClick={handleCancelClick}
                  icon={<CloseOutlined />}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button onClick={handleEditClick} icon={<EditOutlined />}>
                Edit
              </Button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MyProfile;
