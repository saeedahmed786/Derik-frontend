import { CheckCircleOutlined, CloseCircleFilled } from '@ant-design/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../../Components/Auth/auth';
import { ProfLayout } from '../../Components/Layouts/ProfileLayout';
import Loading from '../../Components/Loading/Loading';
import { Error } from '../../Components/Messages/messages';

export const Orders = () => {
    const user = isAuthenticated();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllOrders = async () => {
        setLoading(true);
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/orders/${user._id}`, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            if (res.status === 200) {
                setOrders(res.data.filter(d => d.status !== '5'));
                setLoading(false);
            }
            else {
                Error(res.data.errorMessage);
            }
        })
    }

    useEffect(() => {
        getAllOrders();
        return () => {

        }
    }, []);


    return (
        <ProfLayout sidebar>
            {
                loading ?
                    <Loading />
                    :
                    <div className='orders pt-2'>
                        <table class="table border-0">
                            {
                                orders && orders.length > 0 ? orders.map((order, index) => {
                                    return (
                                        <>
                                            <tbody className='mb-5'>
                                                <tr className='bg-secondary text-white'>
                                                    <th>
                                                        Order #{index + 1}
                                                    </th>
                                                    <th>
                                                        Order Id : {order._id}
                                                    </th>
                                                    <th>
                                                        Total Price : {order?.totalPrice}$
                                                    </th>
                                                    <th>
                                                        <span>Status : &nbsp;
                                                            {order?.status === "1" && 'Just Placed'}
                                                            {order?.status === "2" && 'Confirmed'}
                                                            {order?.status === "3" && 'Prepared'}
                                                            {order?.status === "4" && 'Delivered'}
                                                            {order?.status === "5" && <CheckCircleOutlined className='fs-5 text-success bg-white rounded-circle' style={{ marginTop: '-10px' }} />}
                                                            {order?.status === "0" && <CloseCircleFilled className='fs-5 text-danger bg-white rounded-circle' style={{ marginTop: '-10px' }} />}
                                                        </span>
                                                    </th>
                                                </tr>
                                                <div className='text-center mb-4' style={{ width: '100%', position: 'relative' }}>
                                                    <th style={{ position: "absolute", left: '100%', top: '0px', width: '100vw', maxWidth: "500px" }}>
                                                        <span>Placed At: {order.placed}</span>
                                                    </th>
                                                </div>
                                                {
                                                    order?.products?.map(product => {
                                                        return (
                                                            <tr>
                                                                <th>
                                                                    <img src={product && product.image?.url} height='71' width='64' alt='order' />
                                                                </th>
                                                                <th>
                                                                    {product && product.name}

                                                                </th>
                                                                <th>Qty:{product && product.qty}</th>
                                                                <th>{product && product.price * product.qty}$</th>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </>

                                    )
                                })

                                    :

                                    <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '40vh' }}>
                                        <p className='fs-4'>No Orders!</p>
                                    </div>
                            }

                        </table>
                    </div>
            }
        </ProfLayout>
    )
}
