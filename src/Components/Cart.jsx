import React from 'react'
import { useSelector } from 'react-redux';
import CartProduct from '../SharedComponents/CartProduct';
// import { useFetchUserCartQuery } from '../features/cartApiSlice';
const Cart = () => {

    
    const userCart = useSelector((state) => state.cart.cartItems);
   
    return (
        <div>
            <h2>User Cart</h2>

            <div>
                {userCart.map((item, index) => (
                    <CartProduct key={index} item={item} />

                ))}
            </div>
        </div>
    );
}




export default Cart
