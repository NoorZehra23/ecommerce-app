import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../Features/usersSlice";
export const store=configureStore({
reducer:{
    user:usersSlice
}


})
