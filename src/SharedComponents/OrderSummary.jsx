import React from 'react';
import { Card, Divider, Button } from 'antd';
import { useSelector } from 'react-redux';
const OrderSummary = () => {
    const userCart = useSelector((state) => state.cart.cartItems);
    const subtotal = userCart.reduce((total, item) => total + (item.quantity * item.product.price), 0);
    const itemCount = userCart.reduce((total, item) => total + (item.quantity), 0);

    // Shipping fee
    const shippingFee = 200;

    // Total
    const total = subtotal + shippingFee;

    return (
      
      <Card title="Order Summary">    
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>Subtotal ({itemCount} items)</p>
                <h3>Rs{subtotal.toFixed(2)}</h3>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>Shipping Fee</p>
                <h3>Rs{shippingFee.toFixed(2)}</h3>
            </div>
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Total</h3>
                <h2>Rs{total.toFixed(2)}</h2>
            </div>
            <Button type="primary" block style={{ marginTop: '5px' }}>Proceed to Checkout</Button>
        </Card>
    );
};

export default OrderSummary;
