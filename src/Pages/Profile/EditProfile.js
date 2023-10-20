import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../Components/Auth/auth';
import { ProfLayout } from '../../Components/Layouts/ProfileLayout';
import Loading from '../../Components/Loading/Loading';
import { Error, Success } from '../../Components/Messages/messages';
import './Profile.css'

export const EditProfile = () => {
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        city: '',
        state: '',
        country: '',
        email: '',
        zipCode: '',
    });

    const { firstName, lastName, phone, country, city, state, email, zipCode } = user;

    const handleProfileChnage = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const getUser = async () => {
        setLoading(true);
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/get/${isAuthenticated()._id}`).then(res => {
            setLoading(false);
            if (res.status === 200) {
                setUser(res.data);
            } else {
                setUser('');
            }

        })
    }

    const submitEditHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/users/update`, user, {
            headers: {
                'authorization': 'Bearer ' + token
            }
        }).then(res => {
            setLoading(false);
            if (res.status === 200) {
                Success(res.data.successMessage);
            } else {
                Error(res.data.errorMessage);
            }
        });

    }


    useEffect(() => {
        getUser();
        return () => {

        }
    }, []);

    return (
        <ProfLayout sidebar>
            {
                loading ?
                    <Loading />
                    :
                    <div className='edit-profile'>
                        <form className='border mb-5' onSubmit={submitEditHandler}>
                            <div className="row p-3" style={{ marginLeft: '10px' }}>
                                <div className="col-xs-4 col-xs-offset-4 mr-4">
                                    <div>
                                        <div className="floating-label-group">
                                            <input onChange={handleProfileChnage} value={firstName} name='firstName' type="text" id="firstName" className="form-control" autofocus required />
                                            <label className="floating-label">First Name</label>
                                        </div>
                                        <div className="floating-label-group">
                                            <input onChange={handleProfileChnage} value={lastName} name='lastName' type="text" id="lastName" className="form-control" autofocus required />
                                            <label className="floating-label">Last Name</label>
                                        </div>
                                    </div>
                                    <div className="floating-label-group">
                                        <input onChange={handleProfileChnage} value={email} name='email' type="email" id="Email" className="form-control" autofocus required />
                                        <label className="floating-label">Email</label>
                                    </div>
                                    <div className="floating-label-group">
                                        <input onChange={handleProfileChnage} onInput={(e) => e.target.value = e.target.value.slice(0, 11)} value={phone} name='phone' type="number" id="phone" className="form-control" autofocus required />
                                        <label className="floating-label">Phone</label>
                                    </div>
                                    <div className="floating-label-group">
                                        <input onChange={handleProfileChnage} value={city} name='city' type="text" id="City" className="form-control" autofocus required />
                                        <label className="floating-label">City</label>
                                    </div>
                                    <div className="floating-label-group">
                                        <input onChange={handleProfileChnage} value={state} name='state' type="text" id="State" className="form-control" autofocus required />
                                        <label className="floating-label">State</label>
                                    </div>
                                    <div className="floating-label-group">
                                        <input onChange={handleProfileChnage} value={zipCode} name='zipCode' type="text" className="form-control" autofocus required />
                                        <label className="floating-label">Postal Code</label>
                                    </div>
                                    <div className="floating-label-group">
                                        <input onChange={handleProfileChnage} value={country} name='country' type="text" id="country" className="form-control" autofocus required />
                                        <label className="floating-label">Country</label>
                                    </div>

                                </div>

                            </div>
                            <div className='px-5'>
                                <button className='btn submit-btn' type='submit'>Save Details</button>
                            </div>
                            <div className='px-5 my-4'>
                                <Link to='/profile' className='btn submit-btn bg-white border-secondary text-dark font-weight-bolder'>Cancel</Link>
                            </div>
                        </form>
                    </div>
            }
        </ProfLayout>
    )
}
