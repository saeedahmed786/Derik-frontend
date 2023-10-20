import { DeleteOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Layout } from '../../../Components/Layouts/Layout';
import { Error, Success } from '../../../Components/Messages/messages';

export const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [mainSuppliers, setMainSuppliers] = useState([]);
  const [searchText, setSearchText] = useState("");

  const searchHandler = () => {
    setSuppliers(mainSuppliers?.filter(supp =>
      supp?.firstName?.toLowerCase().includes(searchText?.toLowerCase()) ||
      supp?.lastName?.toLowerCase().includes(searchText?.toLowerCase())
    ));
  }

  const getAllSuppliers = async () => {
    await axios.get('/api/users/sellers', {
      headers: {
        "authorization": 'Bearer ' + localStorage.getItem('token')
      }
    }).then(res => {
      if (res.status === 200) {
        setSuppliers(res.data);
        setMainSuppliers(res.data);
      } else {
        Error(res.data.errorMessage);
      }
    })
  }

  useEffect(() => {
    getAllSuppliers()
    return () => {
    }
  }, []);

  const deleteHandler = async (id) => {
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/suppliers/delete/${id}`, {
      headers: {
        "authorization": 'Bearer ' + localStorage.getItem('token')
      }
    }).then(res => {
      if (res.status === 200) {
        Success(res.data.successMessage)
        getAllSuppliers();
      } else {
        Error(res.data.errorMessage)
      }
    })

  }

  return (
    <Layout sidebar>
      <div className='suppliers'>
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
                suppliers?.length > 0 && suppliers?.map((supplier) => {
                  return (
                    <>
                      <tr key={supplier._id} style={{ borderBottom: '1px solid black' }}>
                        <th>{supplier?._id}</th>
                        <th scope="col">{supplier.firstName}</th>
                        <th scope="col">{supplier.lastName}</th>
                        <th scope="col">{supplier.email}</th>
                        <th scope="col">{supplier.phone}</th>
                        <th scope="col">{supplier.zipCode}</th>
                        <th>
                          {/* <button className='btn text-black' style={{ textDecoration: 'none' }}><UpdateSuppliers updateFunction={updateFunction} supplier={supplier} /></button> */}
                          <button className='btn' onClick={() => deleteHandler(supplier._id)}><DeleteOutlined /></button>
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
