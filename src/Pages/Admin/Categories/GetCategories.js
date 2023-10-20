import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CreateMainCategories } from '../../../Components/Admin/Forms/CreateMainCategories';
import { UpdateCategories } from '../../../Components/Admin/Forms/UpdateCategories';
import { Layout } from '../../../Components/Layouts/Layout';
import { Error, Success } from '../../../Components/Messages/messages';

export const GetCategories = () => {
  const [categories, setCategories] = useState([]);
  const getAllCategories = async () => {
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/categories/get`).then(res => {
      if (res.status === 200) {
        setCategories(res.data);
      } else {
        Error(res.data.errorMessage);
      }
    })
  }

  useEffect(() => {
    getAllCategories()
    return () => {
    }
  }, []);

  const updateFunction = () => {
    getAllCategories();
  }

  const deleteHandler = async (id) => {
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/categories/delete/${id}`, {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then(res => {
      if (res.status === 200) {
        Success(res.data.successMessage)
        getAllCategories();
      } else {
        Error(res.data.errorMessage)
      }
    })

  }

  return (
    <Layout sidebar>
      <div className='categories'>
        {/* Create categories */}
        <div className='d-flex justify-content-end gap-4 mt-4'>
          <div>
            <CreateMainCategories updateFunction={updateFunction} />
          </div>
        </div>

        {/* Show categories */}
        <div className='table-container'>
          <table className="table table-borderless">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Categories</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                categories?.length > 0 && categories?.map((cat, index) => {
                  return (
                    <>
                      <tr key={cat._id} style={{ borderBottom: '1px solid black' }}>
                        <th>{index + 1}:</th>
                        <th scope="col">{cat.name}</th>
                        <th>
                          <button className='btn' style={{ textDecoration: 'none' }}><UpdateCategories updateFunction={updateFunction} name={cat.name} catId={cat._id} /></button>
                          <button className='btn' onClick={() => deleteHandler(cat._id)}><DeleteOutlined /></button>
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
