import React from "react";
import { Card } from "antd";
// import { useNavigate } from "react-router-dom";
const OrderComponent = ({ item }) => {
  const { quantity, product } = item;
  //   const navigate = useNavigate();
  //   const handleClick = () => {
  //     const url = `/product/${product.id}`;
  //     navigate(url, { state: product });
  //   };

  return (
    <Card
      bordered={false}
      style={{ marginBottom: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
      key={product.id}
      //   onClick={handleClick}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: "80px",
            height: "auto",
            marginLeft: "8px",
            marginRight: "16px",
            borderRadius: "4px",
          }}
        />
        <div style={{ flex: 1 }}>
          <div
            style={{ marginBottom: "8px", fontWeight: "bold", color: "#333" }}
          >
            {product.title}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "16px", color: "#888" }}>
              Rs{(product.price * quantity).toFixed(2)}
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ color: "#888", marginRight: "8px" }}>
                  Quantity:
                </span>
                <span style={{ color: "black" }}>{quantity}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OrderComponent;
