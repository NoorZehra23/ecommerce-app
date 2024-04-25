import React from 'react'
import { useSelector } from 'react-redux';
import CartProduct from '../SharedComponents/CartProduct';
import OrderSummary from '../SharedComponents/OrderSummary';
import {Space} from 'antd';
import {Typography} from 'antd';
const Cart = () => {
const {Text}= Typography;
    const userCart = useSelector((state) => state.cart.cartItems);
    if (userCart.length === 0) {
        return (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Text>Your cart is empty</Text>
          </div>
        );
      }

      //cart is not empty
    return (       
            <Space>
            {/* div to display order cart items */}
            <div style={{ flex: 3, backgroundColor: 'white', padding: '10px', overflowY: 'auto', maxHeight: 'calc(85vh - 64px)', marginBottom:'13px'  }}>
                              {userCart.map((item, index) => (
                    <CartProduct key={index} item={item} />
                ))} 
            </div>
            {/* div to display order summary */}
            <div style={{ flex: 1, backgroundColor: '#f0f2f5', padding: '16px' }}> 
                <OrderSummary />
            </div>
        </Space>
)}





export default Cart;

