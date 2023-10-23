import { DeleteOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Layout } from '../../../Components/Layouts/Layout';
import { Error, Success } from '../../../Components/Messages/messages';

export const Sellers = () => {
  const [Sellers, setSellers] = useState([]);
  const [mainSellers, setMainSellers] = useState([]);
  const [searchText, setSearchText] = useState("");

  const searchHandler = () => {
    setSellers(mainSellers?.filter(supp =>
      supp?.firstName?.toLowerCase().includes(searchText?.toLowerCase()) ||
      supp?.lastName?.toLowerCase().includes(searchText?.toLowerCase())
    ));
  }

  const getAllSellers = async () => {
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/sellers`, {
      headers: {
        "authorization": 'Bearer ' + localStorage.getItem('token')
      }
    }).then(res => {
      if (res.status === 200) {
        setSellers(res.data);
        setMainSellers(res.data);
      } else {
        Error(res.data.errorMessage);
      }
    })
  }

  useEffect(() => {
    getAllSellers()
    return () => {
    }
  }, []);

  const deleteHandler = async (id) => {
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/Sellers/delete/${id}`, {
      headers: {
        "authorization": 'Bearer ' + localStorage.getItem('token')
      }
    }).then(res => {
      if (res.status === 200) {
        Success(res.data.successMessage)
        getAllSellers();
      } else {
        Error(res.data.errorMessage)
      }
    })

  }

  return (
    <Layout sidebar>
      <div className='Sellers'>
        <div className='my-4'>
          <Input size='large' placeholder='Search here' onChange={(e) => setSearchText(e.target.value)} />
          <br />
          <Button size='large' className='mt-4' onClick={searchHandler}>Search</Button>
        </div>
        <div className='table-container'>
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
                Sellers?.length > 0 && Sellers?.map((Seller) => {
                  return (
                    <>
                      <tr key={Seller._id} style={{ borderBottom: '1px solid black' }}>
                        <th>{Seller?._id}</th>
                        <th scope="col">{Seller.firstName}</th>
                        <th scope="col">{Seller.lastName}</th>
                        <th scope="col">{Seller.email}</th>
                        <th scope="col">{Seller.phone}</th>
                        <th scope="col">{Seller.zipCode}</th>
                        <th>
                          {/* <button className='btn text-black' style={{ textDecoration: 'none' }}><UpdateSellers updateFunction={updateFunction} Seller={Seller} /></button> */}
                          <button className='btn' onClick={() => deleteHandler(Seller._id)}><DeleteOutlined /></button>
                        </th>
                      </tr>
                    </>
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
