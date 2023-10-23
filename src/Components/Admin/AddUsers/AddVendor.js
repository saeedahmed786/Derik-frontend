import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';
import { Link } from 'react-router-dom';
import { Error, Success } from '../../Messages/messages';
import Loading from '../../Loading/Loading';

export const AddVendor = (props) => {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirm: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
        phone: ''
    });

    // const { firstName, lastName, username, email, password, confirm, city, country, zipCode, phone } = userData;

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (userData.password !== userData.confirm) {
            Error("Passwords don't match");
        } else {
            setLoading(true);
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/signup`, userData).then(res => {
                setLoading(false);
                if (res.status === 200) {
                    Success("Seller added successfully");
                }
                else {
                    Error(res.data.errorMessage);
                }
            })
        }
    };

    return (
        loading
            ?
            <Loading />
            :
            <>
                <div className='text-right mb-4'>
                    <button className='btn btn-dark'>Add Vendor</button>
                </div>
                <div className='auth'>
                    <div className="auth-inner-bubble-container">
                        <h2>Create account</h2>
                        <form onSubmit={submitHandler}>
                            <div className='item'>
                                <label>First Name</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                                    <input name='firstName' type="text" className="form-control" placeholder="First Name" onChange={handleChange} aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                            <div className='item'>
                                <label>Last Name</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                                    <input name='lastName' type="text" className="form-control" placeholder="Last Name" onChange={handleChange} aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                            <div className='item'>
                                <label>Email</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                                    <input name='email' type="text" className="form-control" placeholder="Email" onChange={handleChange} aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                            <div className='item'>
                                <label>Password</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
                                    <input name='password' type="password" className="form-control" placeholder="Password" onChange={handleChange} aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                            <div className='item'>
                                <label>Retype Password</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
                                    <input name='confirm' type="password" className="form-control" placeholder="Retype Password" onChange={handleChange} aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                            <div className='item'>
                                <label>City</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                                    <input name='city' type="text" className="form-control" placeholder="City" onChange={handleChange} aria-label="City" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                            <div className='item'>
                                <label>State</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                                    <input name='state' type="text" className="form-control" placeholder="State" onChange={handleChange} aria-label="State" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                            <div className='item'>
                                <label>Country</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                                    <input name='country' type="text" className="form-control" placeholder="Country" onChange={handleChange} aria-label="Country" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                            <div className='item'>
                                <label>Zip Code</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                                    <input name='zipCode' type="text" className="form-control" placeholder="Zip Code" onChange={handleChange} aria-label="zipCode" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                            <div className='item'>
                                <label>Phone</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                                    <input name='phone' type="text" className="form-control" placeholder="Phone" onChange={handleChange} aria-label="Phone" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                            <button className='btn' type="submit">Signup</button>
                        </form>
                        <div className='end-text'>
                            <div>Already have an account?</div>
                            <Link to="/login">
                                <b className='fw-bold'>Login</b>
                            </Link>
                        </div>
                    </div>
                </div>
            </>
    );
};
