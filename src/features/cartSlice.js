import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ref, get, set } from 'firebase/database';
import { database } from '../firebase';

const initialState = {
  cartItems:[],
  cartCount:0,
  loading:false,
  error:null
};

const fetchUserCartFromFirebase = async (userId) => {
  const snapshot = await get(ref(database, `cart/${userId}`));
  if (snapshot.exists()) {
    const userData = snapshot.val();
    const cartItemsArray = Object.values(userData.cartItems);
    return cartItemsArray;
  } else {
    return [];
  }
};


export const postUserCartToFirebase = createAsyncThunk(
  'cart/postUserCartToFirebase',
  async (userId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const uuid= state.user.user.userId
      await set(ref(database, 'cart/'+uuid),{cartItems: state.cart.cartItems});
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);





export const fetchUserCart = createAsyncThunk(
  'cart/fetchUserCart',
  async (userId) => {
    try {
      const userCart = await fetchUserCartFromFirebase(userId);
      return userCart;
    } catch (error) {
      throw Error('Failed to fetch user cart');
    }
  }
);


export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeFromCart: (state,action) => {
      let foundProduct = state.cartItems.find(item => item.product.id ===action.payload.id );
            if (foundProduct)
      {let filteredProducts = state.cartItems.filter(item => item.product.id !== action.payload.id);
      state.cartItems=filteredProducts
      state.cartCount-=1   
    }
    },
    addToCart: (state, action) => {
      let foundProduct = state.cartItems.find(item => item.product.id ===action.payload.product.id );
            if (foundProduct)
            
      {
        let quantity=foundProduct.quantity;
        let updatedQuant=action.payload.quantity +quantity;
        foundProduct.quantity=updatedQuant;
      }
     else{
      let product=action.payload.product
      let quantity=action.payload.quantity
      state.cartItems.push({product:product,quantity:quantity});
      state.cartCount+=1   
    }
    },
    },
    extraReducers: (builder) => {
          builder
            .addCase(fetchUserCart.pending, (state) => {
              state.loading = 'true';
              state.error = null;
            })
            .addCase(fetchUserCart.fulfilled, (state, action) => {
              state.loading = 'false';
              state.cartItems = Object.values(action.payload) // Assuming the payload contains cart items
              state.cartCount = Object.keys(action.payload).length
            })
            .addCase(fetchUserCart.rejected, (state, action) => {
              state.loading = 'failed';
              state.error = action.error.message;
            })
            .addCase(postUserCartToFirebase.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(postUserCartToFirebase.fulfilled, (state) => {
              state.loading = false;
              state.error = null;
              state.cartCount=0;
              state.cartItems=[];
            })
            .addCase(postUserCartToFirebase.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            });
        
        }
});

export const { removeFromCart,addToCart} = cartSlice.actions;
export default  cartSlice.reducer;
