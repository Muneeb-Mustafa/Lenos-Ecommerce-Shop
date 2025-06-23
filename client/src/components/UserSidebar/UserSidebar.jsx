import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Drawer } from 'antd';
import { DashboardOutlined, UserOutlined, PoweroffOutlined, MenuOutlined } from '@ant-design/icons';

const UserSidebar = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Track screen width for mobile view

  const onClick = (e) => {
    if (e.key === '1') {
      navigate('/dashboard/users/profile');
    }  
    if (e.key === '2') {
      navigate('/dashboard/users/orders');
    }

    // Close the sidebar after a menu item is clicked on mobile
    if (isMobile) {
      toggleDrawer();
    }
  };

  const items = [
    {
      key: 'sub1',
      label: 'Profile',
      icon: <DashboardOutlined />,
      children: [
        {
          key: '1',
          label: 'Profile',
        },
      ],
    },
    {
      key: 'sub2',
      label: 'Orders',
      icon: <DashboardOutlined />,
      children: [
        {
          key: '2',
          label: 'Orders',
        },
      ],
    },
    {
      type: 'divider',
    },
  ];

  const profileItems = [
    {
      key: 'grp',
      icon: <UserOutlined />,
      label: 'Profile',
      children: [
        {
          key: '13',
          icon: <PoweroffOutlined />,
          label: 'Signout',
          danger: true,
        },
      ],
    },
  ];

  const toggleDrawer = () => {
    setVisible(!visible);
  };

  // Handle screen resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Update mobile detection on resize
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Icon to toggle sidebar on mobile */}
      {isMobile && (
        <MenuOutlined
          onClick={toggleDrawer}
          style={{
            position: 'fixed', // Fixes the icon to the left
            top: '80px', // Adjust top spacing
            left: '0px', // Adjust left spacing
            zIndex: 1000,
            fontSize: '24px',
            color: '#fff', // Icon color
            backgroundColor: '#001529', // Background color for the icon
            padding: '10px', // Padding around the icon for better clickability
            borderRadius: '0px 18px 18px 0px', // Rounded corners
          }}
        />
      )}

      {/* Sidebar for larger screens */}
      {!isMobile && (
        <div
          className="desktop-sidebar"
          style={{
            width: 256,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            left: 0,
            top: 0,
            background: '#001529',
          }}
        >
          <Menu
            onClick={onClick}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            items={items}
            style={{ flexGrow: 1 }}
          />
          <Menu onClick={onClick} mode="inline" theme="dark" items={profileItems} />
        </div>
      )}

      {/* Sidebar Drawer for small screens */}
      <Drawer
        title="Menu"
        placement="left"
        closable={false}
        onClose={toggleDrawer}
        visible={visible}
        width={250}
      >
        <Menu onClick={onClick} defaultSelectedKeys={['1']} mode="inline" theme="dark" items={items} />
        <Menu onClick={onClick} mode="inline" theme="dark" items={profileItems} />
      </Drawer>
    </>
  );
};

export default UserSidebar;
