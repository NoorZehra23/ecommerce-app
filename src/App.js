import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import Home from './Home';
import Layout from './Layout';
import Login from './Login';
import { getDatabase } from 'firebase/database';
import { app } from './firebase';

const db=getDatabase(app);
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'  element={<Layout/>}>
      <Route
        path='/login'
        element={<Login/>} />
      <Route path='/home' element={<Home/>} />
      {/* <Route path='/login' element={< />} /> */}
    </Route>
  )
)


const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
