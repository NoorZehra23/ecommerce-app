import React from 'react';
import { Card, Button } from 'antd';
import { CloseOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../features/cartSlice';

const CartProduct = ({ item }) => {
    const { quantity, product } = item;
    const dispatch = useDispatch();

    const handleCross = () => {
       dispatch(removeFromCart(product));
    };

    const handleIncrease = () => {
        dispatch(addToCart({ product: product, quantity: 1 }));
    };

    const handleDecrease = () => {
        dispatch(addToCart({ product: product, quantity: -1 }));
    };



    return (
        <div style={{ border: '1px solid #d9d9d9', borderRadius: '5px', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={product.image} alt={product.title} style={{ width: '80px', height: 'auto', marginRight: '10px' }} />
                <div style={{ flex: 1 }}>
                    <Card
                        title={product.title}
                        extra={<Button type="text" icon={<CloseOutlined />} onClick={handleCross} />}
                        bordered={false}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>${(product.price * quantity).toFixed(2)}</div>
                            <div>
                                <Button type="primary" icon={<MinusOutlined />} onClick={handleDecrease} />
                                <span style={{ margin: '0 10px' }}>{quantity}</span>
                                <Button type="primary" icon={<PlusOutlined />} onClick={handleIncrease} />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CartProduct;
