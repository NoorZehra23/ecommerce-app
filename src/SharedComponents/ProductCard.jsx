import React from 'react';
import { Card } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import{ Button } from"antd";
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const dispatch=useDispatch();
    const handleAddToCart = () => {
        console.log('Product added to cart:', product.title);
      dispatch(addToCart({product:product, quantity:1}))
      };
    return (
    <Card 
      hoverable
      style={{ width: 350, height:350 }}
      cover={
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
