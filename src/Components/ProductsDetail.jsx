import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Rate } from "antd";
import {
  ShoppingCartOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  fetchUserCart,
  postUserCartToFirebase,
} from "../features/cartSlice";
import { notification } from "antd";

const ProductsDetail = () => {
  const { Text } = Typography;
  const location = useLocation();
  const product = location.state;
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    if (isLoggedIn) {
      setIsAdded(true);
      dispatch(addToCart({ product: product, quantity: quantity }));
      setTimeout(() => {
        setQuantity(1);
        setIsAdded(false);
      }, 1000);
    } else {
      notification.error({
        message: "Error",
        description: "Please log in to add to cart!",
        placement: "topRight",
        duration: 2,
      });
    }
  };

  return (
    <div style={{ display: "flex", height: 450 }}>
      <div style={{ flex: 1, padding: "15px" }}>
        <div
          style={{ marginBottom: "10px", fontSize: "20px", fontWeight: "bold" }}
        >
          {product.title}
        </div>
        <Text type="secondary" style={{ marginBottom: "10px" }}>
          {product.description}
        </Text>

        <div style={{ marginRight: "10px", marginTop: "5px" }}>
          <Text strong style={{ marginRight: "10px" }}>
            Price:
          </Text>
          <span> {product.price}Rs</span>
        </div>

        <div style={{ marginBottom: "10px", marginTop: "5px" }}>
          <Text strong style={{ marginRight: "10px" }}>
            Ratings
          </Text>
          <Rate disabled defaultValue={product.rating.rate} allowHalf /> (
          <span>{product.rating.count}</span>)
        </div>

        <div
          style={{
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Text strong style={{ marginRight: "10px" }}>
            Quantity:
          </Text>
          <Button
            type="default"
            icon={<MinusOutlined />}
            onClick={() => setQuantity(quantity - 1)}
            disabled={quantity === 1}
          />
          <span style={{ margin: "0 10px" }}>{quantity}</span>
          <Button
            type="default"
            icon={<PlusOutlined />}
            onClick={() => setQuantity(quantity + 1)}
            disabled={quantity >= product.quantity}
          />
        </div>
        <Text type="secondary" style={{ marginBottom: "5px" }}>
          Items available in stock: {product.quantity - quantity}
        </Text>
        <div
          style={{
            marginTop: "10px",
            marginLeft: "20px",
          }}
        >
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            style={{
              width: "50%",
              backgroundColor: isAdded ? "#87d068" : "", // Green color when disabled
              borderColor: isAdded ? "#87d068" : "",
              color: "white",
            }}
            onClick={handleAddToCart}
            disabled={isAdded}
          >
            {isAdded ? "Added to Cart" : "Add to Cart"}
          </Button>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          alt={product.title}
          src={product.image}
          style={{
            maxWidth: "200px",
            maxHeight: "300px",
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
};

export default ProductsDetail;
