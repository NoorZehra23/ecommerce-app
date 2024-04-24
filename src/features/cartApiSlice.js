import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ref, get } from 'firebase/database';
import { database } from '../firebase';
// Define the base query function to fetch data from Firebase Realtime Database
const baseQuery = async (url) => {
  const snapshot = await get(ref(database, url));
  return snapshot.exists() ? snapshot.val() : {};
};

// Create an API slice
export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    fetchUserCart: builder.query({
      query: (userId) => `cart/${userId}`,
      transformResponse: (response) => response, // No transformation needed
    }),
  }),
});

// Export the auto-generated hooks
export const { useFetchUserCartQuery } = cartApi;