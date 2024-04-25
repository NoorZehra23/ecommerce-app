import React from 'react';
import { Outlet } from 'react-router-dom'
import CustomHeader from './SharedComponents/CustomHeader';
import FooterComponent from './SharedComponents/CustomFooter';
  const Layout = () => {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <CustomHeader style={{ flex: '0 0 auto' }} />
        <div style={{ flex: '1 0 auto' }}>
          <Outlet />
        </div>
        <FooterComponent style={{ flex: '0 0 auto' }} />
      </div>
    );
  };
  

export default Layout;