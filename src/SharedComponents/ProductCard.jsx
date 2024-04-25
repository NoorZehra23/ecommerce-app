import React from 'react';
import { Card } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
const ProductCard = ({ product }) => {
  const { Meta } = Card;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)

  const handleTouchProductClick = () => {
    const url = '/details';
    navigate(url, { state: product });
  };


  const handleAddToCart = () => {
    if (isLoggedIn) {
      dispatch(addToCart({ product: product, quantity: 1 }));
      // Display toaster message for successful addition to cart
      notification.success({
        message: 'Success',
        description: 'Product added to cart!',
        placement: 'topRight', // You can adjust the position here
        duration: 2,
        stack: true | { threshold: 2 }
      });

    } else {
      notification.error({
        message: 'Error',
        description: 'Please log in to add to cart!',
        placement: 'topRight',
        duration: 2,
        stack: { threshold: 2 } // You can adjust the position here
      });
    }
  }; return (

    <Card
      hoverable
      style={{ width: 350, height: 350 }}
      cover={
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={handleTouchProductClick}>
          <img alt={product.title} src={product.image} style={{ width: '40%', height: '40%' }} />
        </div>}
    >
      <Meta title={<div style={{ fontSize: '14px' }}>{product.title}</div>} description={`$${product.price}`} />
      {/* <p>{product.description}</p>
      <p>In Stock: {product.quantity}</p>
      <p>Rating: <Rate disabled defaultValue={product.rating.rate} allowHalf='true'/> ({product.rating.count} reviews)</p> */}
      <Button type="primary" icon={<ShoppingCartOutlined />} onClick={handleAddToCart} style={{ marginTop: '5px', width: '50%' }}>
        Add to Cart
      </Button>
    </Card>
  );
}

export default ProductCard;
