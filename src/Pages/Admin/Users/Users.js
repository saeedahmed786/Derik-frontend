import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CheckSquareFilled, DeleteOutlined } from '@ant-design/icons';
import { UserDrawer } from '../../../Components/Admin/Users/Drawer/Drawer';
import { Layout } from '../../../Components/Layouts/Layout';
import { Error, Success } from '../../../Components/Messages/messages';


export const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        getUsers();
        return () => {

        }
    }, [success]);

    const getUsers = async () => {
        setLoading(true);
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/get`, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            setLoading(false);
            if (res.status === 200) {
                setUsers(res.data);
            } else {
                setUsers('');
            }
        })
    }

    const deleteHandler = async (userId) => {
        setLoading(true);
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/users/delete/${userId}`, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            setLoading(false);
            if (res.status === 200) {
                Success(res.data.successMessage);
                getUsers();
            } else {
                Error(res.data.errorMessage)
            }
        })
    }

    const enableHandler = async (userId) => {
        setLoading(true);
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/users/enable/${userId}`, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            setLoading(false);
            if (res.status === 200) {
                Success(res.data.successMessage);
                getUsers();
            } else {
                Error(res.data.errorMessage)
            }
        })
    }


    return (
        <Layout sidebar>
            <div className='table-responsive'>
                <div className='table-container'>
                    <div className='text-end d-flex justify-content-end mb-4'>
                        <UserDrawer update={getUsers} />
                    </div>
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Zip Code</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.length > 0 && users?.map((user, index) => {
                                    return (
                                        <tr>
                                            <th className='pt-4' scope="row">{index + 1}</th>
                                            <td className='pt-4'>{user.firstName}</td>
                                            <td className='pt-4'>{user.lastName}</td>
                                            <td className='pt-4'>{user.email}</td>
                                            <td className='pt-4'>{user.phone}</td>
                                            <td className='pt-4'>{user.zipCode}</td>
                                            <td className='pt-4'>
                                                <div className='d-flex align-items-center gap-2'>
                                                    {
                                                        user.status && user.status === 'disabled' ?
                                                            <h6 className='text-danger mb-1 d-flex align-items-center gap-2'>Disabled <CheckSquareFilled className='text-success mb-' onClick={() => { enableHandler(user._id); setSuccess(true); }} style={{ cursor: 'pointer' }} /></h6>
                                                            :
                                                            <a onClick={() => { deleteHandler(user._id); setSuccess(true); }}><DeleteOutlined className='mb-2' /></a>
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}
