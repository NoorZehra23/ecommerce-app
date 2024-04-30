import React from "react";
import { Card, Divider, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { push, ref } from "firebase/database";
import { database } from "../firebase";
import { emptyCart } from "../features/cartSlice";
import { Modal } from "antd";
import { notification } from "antd";
const OrderSummary = () => {
  const { confirm } = Modal;
  const userCart = useSelector((state) => state.cart.cartItems);
  const subtotal = userCart.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0
  );
  const itemCount = userCart.reduce((total, item) => total + item.quantity, 0);
  const userId = useSelector((state) => state.user.user.userId);
  const shippingFee = 200; // Shipping fee
  const total = subtotal + shippingFee; // Total
  const dispatch = useDispatch();
  const postOrder = async () => {
    const currentDate = new Date().toString();
    try {
      await push(ref(database, "orders/" + userId), {
        orderDetails: userCart,
        total: total,
        orderStatus: "pending",
        date: currentDate,
      });
      console.log(" Orders Data has been successfully saved to the database.");
    } catch (error) {
      console.error("Error writing data to the database:", error);
    }
  };

  const handlePlaceOrder = () => {
    confirm({
      title: "Confirm Order",
      content: "Do you want to check out?",
      async onOk() {
        try {
          await postOrder();
          dispatch(emptyCart());
          notification.success({
            message: "Success",
            description: "Successfly placed your order!",
            placement: "topRight",
            duration: 2,
            stack: true | { threshold: 2 },
          });
        } catch (error) {
          console.error("Error placing order:", error);
        }
      },
      onCancel() {
        // Do nothing.
      },
    });
  };

  return (
    <Card title="Order Summary">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>Subtotal ({itemCount} items)</p>
        <h3>Rs{subtotal.toFixed(2)}</h3>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>Shipping Fee</p>
        <h3>Rs{shippingFee.toFixed(2)}</h3>
      </div>
      <Divider />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Total</h3>
        <h2>Rs{total.toFixed(2)}</h2>
      </div>
      <Button
        type="primary"
        block
        style={{ marginTop: "5px" }}
        onClick={handlePlaceOrder}
      >
        Place Order
      </Button>
    </Card>
  );
};
export default OrderSummary;
