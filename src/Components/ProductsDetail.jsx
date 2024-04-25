import React from 'react'
import { useLocation } from 'react-router-dom';
import { Rate } from 'antd';
import {  ShoppingCartOutlined } from '@ant-design/icons';
import { Button } from "antd";
import {Typography} from 'antd';

const ProductsDetail = () => {
    const {Text}=Typography;
    const location= useLocation();
    const product=location.state;
  return (
    <div style={{ display: 'flex', height: 450 }}>
    <div style={{ flex: 1, padding: '15px' }}>
      <div style={{ marginBottom: '10px', fontSize: '14px' }}>{product.title}</div>
      <div style={{ marginBottom: '10px' }}>Rs{product.price}</div>
      <Text>{product.description}</Text>
      <Text strong>In Stock: {product.quantity}</Text>
      <Text>
        Rating: <Rate disabled defaultValue={product.rating.rate} allowHalf /> ({product.rating.count})
      </Text>
      <Button type="primary" icon={<ShoppingCartOutlined />} style={{ marginTop: '5px', width: '50%' }}>
        Add to Cart
      </Button>
    </div>
    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img alt={product.title} src={product.image} style={{ maxWidth: '200px', maxHeight: '300px', objectFit: 'contain' }} />
    </div>
  </div>
)
}

export default ProductsDetail;

