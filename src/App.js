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
import SignUp from './Signup';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Cart from './Components/Cart';
import MyProfile from './Components/MyProfile';
import ProductsDetail from './Components/ProductsDetail';


const App = () => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'  element={<Layout/>}>
        <Route path='/' element={<Home/>} />
        <Route path='/details' element={<ProductsDetail/>} />
        <Route path='/login'element={<Login/>} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/cart'  element={isLoggedIn ?<Cart/> : <Navigate to='/login' />}/>
        <Route path='/myProfile'  element={isLoggedIn ?<MyProfile/> : <Navigate to='/login' />}/>
      </Route>
    )
  )

  return <RouterProvider router={router}  />;
};

export default App;
