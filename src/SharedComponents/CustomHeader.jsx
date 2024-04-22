import React from 'react';
import { Layout, Menu ,Input} from 'antd';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';


const { Header } = Layout;

export default function CustomHeader() {
 
  const items = [
        {
            label: 'Home',
            key: '/home',
            icon: <HomeOutlined />
        },
        {
            label: 'Login',
            key: '/login',
            icon: <UserOutlined />
        },
        {
            label: 'Cart',
            key: '/cart',
            icon: <ShoppingCartOutlined />
        }
    ];

    const navigate = useNavigate();

    return (
        <Header style={{ display: 'flex', alignItems: 'center' }}>
            {/* Logo */}
            <div className="logo">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJquCk6WMyFlDE39BYkh0_gQW4sYyyK2xyLDPrAC0paA&s" alt="Logo" style={{ height: '85px', marginRight: '10px', marginTop: '5px' }} />
            </div>

            {/* Title */}
            <h1 style={{ color: '#fff', margin: 0 }}>Megaztore</h1>
           
                <Input.Search
                    placeholder="Search for products"
                    onSearch={value => console.log(value)} // Handle search functionality
                    style={{ width: 600, marginLeft:'50px' }}
                />


            {/* Menu */}
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['/login']}
                style={{ flex: 1, minWidth: 0, justifyContent: 'flex-end' }}
                items={items}
                onClick={({ key }) => {
                    navigate(key);
                    console.log(key);
                }}
            >
         
            </Menu>
        </Header>
    );
}
