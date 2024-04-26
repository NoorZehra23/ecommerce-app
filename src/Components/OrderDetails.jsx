import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { database } from "../firebase";
import { ref, get } from "firebase/database";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { Space, Table, Tag } from "antd";
import { DatePicker } from "antd";
import moment from "moment-timezone";

const OrderDetails = () => {
  const { Column } = Table;

  const { Text } = Typography;
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.user.userId);
  const [orders, setOrders] = useState([]);

  const getUserOrdersFromFirebase = async () => {
    try {
      const ordersQuery = ref(database, `orders/${userId}`);
      const snapshot = await get(ordersQuery);
      if (snapshot.exists()) {
        const orderData = snapshot.val();
        console.log(orderData);
        setOrders(Object.values(orderData));
      }
    } catch (error) {
      console.error("Error getting user orders from Firebase:", error.message);
    }
  };

  const handleViewDetails = (record) => {
    // let url = `/myOrders/${item.index}`;
    // navigate(url, { state: item });
    console.log(record);
  };

  useEffect(() => {
    getUserOrdersFromFirebase();
  }, []);

  if (!orders.length) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Text>No orders placed</Text>
      </div>
    );
  }

  return (
    <Table dataSource={orders}>
      <Column
        title="Date of Order"
        dataIndex="date"
        key="date"
        render={(date) => moment(date).format("MMMM DD, YYYY")}
      />
      <Column
        title="Order Status"
        dataIndex="orderStatus"
        key="orderStatus"
        render={(tag) => (
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
        )}
      />
      <Column
        title="View"
        key="view"
        render={(_) => (
          <Space size="middle">
            <a onClick={(record) => handleViewDetails(record)}>View Details</a>
          </Space>
        )}
      />
    </Table>
  );
};

export default OrderDetails;
