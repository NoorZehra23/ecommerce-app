import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { database } from "../firebase";
import { ref, get } from "firebase/database";
import { Button, Spin, Typography } from "antd";
import { Table, Tag, Modal } from "antd";
import moment from "moment-timezone";
import OrderComponent from "../SharedComponents/OrderComponent";

const OrderDetails = () => {
  const { Text, Title } = Typography;
  const userId = useSelector((state) => state.user.user.userId);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(null);
  const getUserOrdersFromFirebase = async () => {
    setLoading(true);
    try {
      const ordersQuery = ref(database, `orders/${userId}`);
      const snapshot = await get(ordersQuery);
      if (snapshot.exists()) {
        const orderData = snapshot.val();
        setOrders(Object.values(orderData));
        setLoading(false);
      } else {
        setOrders([]);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error getting user orders from Firebase:", error.message);
    }
  };

  useEffect(() => {
    getUserOrdersFromFirebase();
  }, []);

  const [modaldata, setmodaldata] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (record) => {
    setmodaldata(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Date of Order",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("MM-DD-YYYY"),
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (tag) => (
        <Tag
          color={
            tag === "pending"
              ? "orange"
              : tag === "completed"
              ? "green"
              : "default"
          }
        >
          {tag.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Amount Rs",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "View",
      key: "view",
      render: (index, record) => (
        <Button type="link" onClick={() => showModal(record)}>
          View Details
        </Button>
      ),
    },
  ];

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

  if (!orders.length) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Text>No orders placed</Text>
      </div>
    );
  }

  return (
    <>
      <Table dataSource={orders} columns={columns} />
      {modaldata && modaldata.orderDetails && (
        <Modal
          open={isModalVisible}
          title="Order Details"
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ style: { display: "none" } }}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          {/* div to display order items */}
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
            {modaldata.orderDetails.map((item, index) => (
              <OrderComponent key={index} item={item} />
            ))}
          </div>
          <div>
            <Text type="secondary" style={{ fontSize: "16px" }}>
              Total
            </Text>
            <Title level={2} style={{ color: "#000", margin: "0" }}>
              Rs{modaldata.total}
            </Title>
          </div>
        </Modal>
      )}
    </>
  );
};
export default OrderDetails;
