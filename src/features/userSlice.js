import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ref, get } from 'firebase/database';
import { database } from "../firebase";

const initialState = {
  user: null,
  isLoading: true,
  isLoggedIn: false,
  error:null
};

const fetchUserDetailsFromFirebase = async (userId) => {
  const snapshot = await get(ref(database, `users/${userId}`));
const userData=snapshot.val();
  return userData;
}

export const fetchUserDetails = createAsyncThunk(
  'user/fetchUserDetails',
  async (userId) => {
    try {
      const userDetails = await fetchUserDetailsFromFirebase(userId);
      return userDetails;
    } catch (error) {
      throw Error('Failed to fetch user ');
    }
  }
);


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  }, extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.isLoading =true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.isLoading =false;
        state.user = {name:action.payload.name,
          email:action.payload.email,
          password:action.payload.password,
          phoneNumber:action.payload.phoneNumber,
          userId:action.payload.userid
        } 
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.isLoading = 'failed';
        state.error = action.error.message;
      })
    },
});

export const { loginUser, logoutUser, setLoading } = userSlice.actions;
export default userSlice.reducer;