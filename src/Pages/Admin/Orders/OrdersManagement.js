import React, { useEffect, useState } from 'react'
import { Select, Tabs } from 'antd';
import { Layout } from '../../../Components/Layouts/Layout';
import axios from 'axios';
import { Order } from '../../../Components/Shared/Order';
import { Error } from '../../../Components/Messages/messages';

const { TabPane } = Tabs;
const { Option } = Select;


export const OrdersManagement = () => {
    const [orders, setOrders] = useState([]);
    const [sort, setSort] = useState(6);

    const getAllOrders = async () => {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/orders/admin/all-orders`, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            if (res.status === 200) {
                setOrders(res.data);
            }
            else {
                Error(res.data.errorMessage)
            }
        })
    }

    useEffect(() => {
        getAllOrders();
        return () => {

        }
    }, []);

    return (
        <Layout sidebar>
            <div className='orders admin-orders pt-5'>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="All" key="1">
                        Sort Orders:
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Sort Orders"
                            allowClear
                            treeDefaultExpandAll
                            value={sort}
                            onChange={(val) => setSort(val)}
                            className='mb-3'
                        >
                            <Option value={6}>All</Option>
                            <Option value={1}>Pending</Option>
                            <Option value={2}>Confirmed</Option>
                            <Option value={3}>Prepared</Option>
                            <Option value={4}>Delivered</Option>
                            <Option value={5}>Completed</Option>
                            <Option value={0}>Cancelled</Option>
                        </Select>
                        <Order orders={sort === 6 ? orders : orders?.filter(order => order?.status === sort)} />
                    </TabPane>
                    <TabPane tab="Active" key="2">
                        <Order orders={orders?.filter(order => order?.status !== 5 && order?.status !== 0)} />
                    </TabPane>
                    <TabPane tab="Completed" key="3">
                        <Order orders={orders?.filter(order => order?.status === 5)} status={5} />
                    </TabPane>
                    <TabPane tab="Cancelled" key="4">
                        <Order orders={orders?.filter(order => order?.status === 0)} status={0} />
                    </TabPane>
                </Tabs>
            </div>
        </Layout>
    )
}
