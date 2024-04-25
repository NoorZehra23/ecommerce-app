import React, { useState } from 'react';
import { Layout, Menu, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, ShoppingCartOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { logoutUser } from '../features/userSlice';
import { postUserCartToFirebase } from '../features/cartSlice';
import { notification } from 'antd';

export default function CustomHeader() {
    const { Header } = Layout;
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)

    const cartCount = useSelector((state) => state.cart.cartCount);
    const dispatch = useDispatch();
    const { confirm } = Modal;
    const [selectedKeys, setSelectedKeys] = useState([])
    const [query, setQuerry] = useState(null);
    const navigate = useNavigate();

    const userName = useSelector(state => state.user.user);


    const handleSelection = (key) => {
        if (!isLoggedIn) {
            if (key === '/cart') {
                setSelectedKeys([]);
                notification.error({
                    message: 'Error',
                    description: 'Please Login to View Cart',
                    placement: 'topRight',
                    duration: 2,
                    stack: true | { threshold: 2 }
                });
            }
        }
        else {
            if (key === '/myOrders' || key === '/myProfile' || key === '/logout' || key === '/wishlist')
                setSelectedKeys([]);
            else
                setSelectedKeys(key);
        }
    }
    // Function to handle logout action
    const handleLogout = () => {
        confirm({
            title: 'Logout',
            content: 'Are you sure you want to logout?',
            onOk() {
                signOut(auth).then(() => {
                    dispatch(postUserCartToFirebase());
                    dispatch(logoutUser());
                    setSelectedKeys([]);
                    notification.success({
                        message: 'Success',
                        description: 'Successfly signed out!',
                        placement: 'topRight',
                        duration: 2,
                        stack: true | { threshold: 2 }
                    });
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
            label: isLoggedIn ? `Hello ${userName.name}` : 'Login',
            key: isLoggedIn ? '/profile' : '/login',
            icon: isLoggedIn ? <UserOutlined /> : <LoginOutlined />,
            children: isLoggedIn ? [
                {
                    label: 'My Orders',
                    key: '/myOrders',
                },
                {
                    label: 'My Profile',
                    key: '/myProfile',
                },
                {
                    label: 'Wishlist',
                    key: '/wishlist',
                },
            ] : null,

        },
        {
            label: isLoggedIn ? `${cartCount} ` : 'Cart',
            key: '/cart',
            icon: <ShoppingCartOutlined />
        },
        {
            label: isLoggedIn ? 'Logout' : null,
            icon: isLoggedIn ? <LogoutOutlined /> : null,
            key: '/logout'

        }
    ];


    const handleSearch = () => {
        console.log(query)

    }

    return (
        <Header style={{ position: 'sticky', display: 'flex', alignItems: 'center', marginBottom: 10 }}>
            {/* Logo */}
            <div className="logo" onClick={() => {
                navigate('/')
                setSelectedKeys([])
            }} style={{ cursor: 'pointer' }} >
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJquCk6WMyFlDE39BYkh0_gQW4sYyyK2xyLDPrAC0paA&s" alt="Logo" style={{ height: '85px', marginTop: '5px' }} />
            </div>
            {/* Title */}
            <h1 style={{ color: '#fff', margin: 0 }}>Megaztore</h1>

            <Input.Search
                placeholder="Search for products"
                onChange={(e) => setQuerry(e.target.value)}
                onSearch={handleSearch} // Handle search functionality
                style={{ width: 600, marginLeft: '50px' }}
            />


            {/* Menu */}
            <Menu
                theme="dark"
                mode="horizontal"
                style={{ flex: 1, minWidth: 0, justifyContent: 'flex-end' }}
                items={items}
                selectedKeys={selectedKeys}
                onClick={({ key }) => {
                    if (key === '/logout' || key === '/profile') {
                        handleLogout();
                    } else {
                        navigate(key);
                        handleSelection(key); // Update selected keys
                    }
                }}
            >
            </Menu>
        </Header>
    );
}
