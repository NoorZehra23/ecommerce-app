import React, { useState } from 'react';
import { Layout, Menu ,Input} from 'antd';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, UserOutlined, ShoppingCartOutlined, LoginOutlined,LogoutOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {Modal} from 'antd';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { logoutUser } from '../features/userSlice';
import { postUserCartToFirebase } from '../features/cartSlice';
const { Header } = Layout;

export default function CustomHeader() {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    const cartCount = useSelector((state) => state.cart.cartCount);
    const uuid =useSelector((state)=>state.user.userId);
    const dispatch=useDispatch();
    const { confirm } = Modal;
    const [selectedKeys,setSelectedKeys]=useState([])
    const [query,setQuerry]=useState(null);
    const navigate = useNavigate();

        // Function to handle logout action
        const handleLogout = () => {
            confirm({
                title: 'Logout',
                content: 'Are you sure you want to logout?',
                onOk() {
                    signOut(auth).then(() => {
                        dispatch(postUserCartToFirebase());
                        dispatch(logoutUser());
                        setSelectedKeys([]); // Clear selected keys
                        // alert("Successfuly logged out");
                      }).catch((error) => {
                        console.log(error)
                    });
                      
                },
                onCancel() {
                    // Do nothing or any other action you want when the user cancels
                },
            });
        };
    
    const items = [
        {
            label: isLoggedIn ? 'My Profile' : 'Login',
            key: isLoggedIn ? '/myProfile' : '/login',
            icon:  isLoggedIn ? <UserOutlined />: <LoginOutlined />,
        },
        {
            label:  isLoggedIn ?`${cartCount} `:'Cart',
            key: '/cart',
            icon: <ShoppingCartOutlined /> 
        },
        {
            label: isLoggedIn ? 'Logout' : null,
            icon:  isLoggedIn ? <LogoutOutlined />:null,
            key:'/logout'

        }
    ];
    
    
    const handleSearch=()=>{
    console.log(query)

    }

    return (
        <Header style={{ display: 'flex', alignItems: 'center', marginBottom:10 }}>
            {/* Logo */}
            <div className="logo" onClick={()=>{navigate('/')
                                setSelectedKeys([])}}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJquCk6WMyFlDE39BYkh0_gQW4sYyyK2xyLDPrAC0paA&s" alt="Logo" style={{ height: '85px', marginRight: '10px', marginTop: '5px' }} />
            </div>

            {/* Title */}
            <h1 style={{ color: '#fff', margin: 0 }}>Megaztore</h1>
           
                <Input.Search
                    placeholder="Search for products"
                    onChange={(e) => setQuerry(e.target.value)}
                    onSearch={handleSearch} // Handle search functionality
                    style={{ width: 600, marginLeft:'50px' }}
                />


            {/* Menu */}
            <Menu
                theme="dark"
                mode="horizontal"
                style={{ flex: 1, minWidth: 0, justifyContent: 'flex-end' }}
                items={items}
                selectedKeys={selectedKeys}
                onClick={({ key }) => {
                    if (key === '/logout') {
                        handleLogout();
                    } else {
                        navigate(key);
                        setSelectedKeys([key]); // Update selected keys
                         }
                }}
            >
         
            </Menu>
        </Header>
    );
}
