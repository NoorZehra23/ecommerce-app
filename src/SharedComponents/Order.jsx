import React from "react";
import { Modal, Button } from "antd";
import OrderComponent from "../SharedComponents/OrderComponent";

const Order = ({ onClose, data, isModalVisible }) => {
  const { orderDetails, total } = data;

  return (
    <Modal
      open={isModalVisible}
      title="Order Details"
      onCancel={onClose}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <div
        style={{
          flex: 3,
          backgroundColor: "white",
          padding: "10px",
          overflowY: "auto",
          maxHeight: "calc(85vh - 64px)",
          marginBottom: "13px",
        }}
      >
        {orderDetails.map((item, index) => (
          <OrderComponent key={index} item={item} />
        ))}
      </div>
      <div>
        <Text type="secondary" style={{ fontSize: "16px" }}>
          Total
        </Text>
        <Title level={2} style={{ color: "#000", margin: "0" }}>
          Rs{total}
        </Title>
      </div>
    </Modal>
  );
};

export default Order;
