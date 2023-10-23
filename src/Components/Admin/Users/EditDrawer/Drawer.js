import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Drawer } from 'antd';
import { EditFilled, UserAddOutlined } from '@ant-design/icons';
import { Error, Success } from '../../../Messages/messages';
import "./Drawer.css"


export const EditUserDrawer = ({ update, user }) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
        phone: '',
        role: ""
    });

    const { firstName, lastName, state, email, city, country, zipCode, phone, username, role } = userData;

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    }


    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    useEffect(() => {
        getUser();

        return () => {

        }
    }, []);

    console.log(userData)

    const submitEditHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/users/admin/update/${user?._id}`, userData, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then(res => {
            setLoading(false);
            if (res.status === 200) {
                Success(res.data.successMessage);
                update();
            } else {
                Error(res.data.errorMessage);
            }
        });
    }

    const getUser = async () => {
        setLoading(true);
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/get/${user?._id}`).then(res => {
            setLoading(false);
            if (res.status === 200) {
                setUserData(res.data);
            } else {
            }

        })
    }

    return (
        <>
            <button className='text-white p-2' onClick={showDrawer}>
                <EditFilled />
            </button>
            <Drawer
                width={640}
                placement="right"
                closable={true}
                onClose={onClose}
                visible={visible}
                className="usersDrawer"
            >
                <div className='¥'>
                    <div className="auth-inner-bubble-container">
                        <h2 className='text-center'>Add User</h2>
                        <form onSubmit={submitEditHandler}>
                            <div className='item'>
                                <label>First Name</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                                    <input name='firstName' type="text" value={firstName} className="form-control" placeholder="First Name" onChange={handleChange} />
                                </div>
                            </div>
                            <div className='item'>
                                <label>Last Name</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                                    <input name='lastName' type="text" value={lastName} className="form-control" placeholder="Last Name" onChange={handleChange} />
                                </div>
                            </div>
                            <div className='item'>
                                <label>Username</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                                    <input name='username' type="text" value={username} className="form-control" placeholder="Last Name" onChange={handleChange} />
                                </div>
                            </div>
                            <div className='item'>
                                <label>Email</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                                    <input name='email' type="text" value={email} className="form-control" placeholder="Email" onChange={handleChange} />
                                </div>
                            </div>
                            <div className='item'>
                                <label>City</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                                    <input name='city' type="text" value={city} className="form-control" placeholder="City" onChange={handleChange} aria-label="City" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                            <div className='item'>
                                <label>State</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                                    <input name='state' type="text" value={state} className="form-control" placeholder="State" onChange={handleChange} aria-label="State" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                            <div className='item'>
                                <label>Country</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                                    <input name='country' type="text" value={country} className="form-control" placeholder="Country" onChange={handleChange} />
                                </div>
                            </div>
                            <div className='item'>
                                <label>Zip Code</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                                    <input name='zipCode' type="text" value={zipCode} className="form-control" placeholder="Zip Code" onChange={handleChange} />
                                </div>
                            </div>
                            <div className='item'>
                                <label>Phone</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                                    <input name='phone' type="text" value={phone} className="form-control" placeholder="Phone" onChange={handleChange} />
                                </div>
                            </div>
                            <div className='item'>
                                <label>Role</label>
                                * Normal user role: 0, Seller role: 2, Admin role: 1
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                                    <input name='role' type="text" value={role} className="form-control" placeholder="Role" onChange={handleChange} />
                                </div>
                            </div>
                            <button className='btn btn-dark w-100 mt-4' type="submit">Add</button>
                        </form>
                    </div>
                </div>
            </Drawer>
        </>
    )
}
