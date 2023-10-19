import React from 'react'
import { Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { NavLink, useLocation } from 'react-router-dom';
import { logout } from '../Auth/auth';

export const SellerSidebar = () => {
    const location = useLocation();
    return (
        <div className='sidebar adminSidebar'>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                }}
            >
                {/* <div><Link to='/' className='logo'>Dêrik-online-shop</Link></div> */}
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['/seller/products']} selectedKeys={[location.pathname]}>
                    <Menu.Item key="/seller/products"><div className='sidebar-links'>
                        <div>
                            <i className="fas fa-chart-pie"></i>
                        </div>
                        <div>
                            <NavLink to='/seller/products'>Products</NavLink>
                        </div>
                    </div>
                    </Menu.Item>
                    <Menu.Item key="/seller/orders">
                        <div className='sidebar-links'>
                            <div>
                                <i className="fas fa-shopping-cart"></i>
                            </div>
                            <div>
                                <NavLink to='/seller/orders'> Order Management</NavLink>
                            </div>
                        </div>
                    </Menu.Item>
                    <Menu.Item key="/seller/logout">
                        <div className='sidebar-links'>
                            <div>
                                <i className="fas fa-sign-out-alt"></i>
                            </div>
                            <div>
                                <a href='/login' onClick={() => { logout(() => { }) }}>
                                    Logout
                                </a>
                            </div>
                        </div>
                    </Menu.Item>
                </Menu>
            </Sider>
        </div>
    )
}
