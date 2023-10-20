import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../Auth/auth';
import { Error, Success } from '../Messages/messages';

export const SharedProducts = (props) => {

    const deleteHandler = async (id) => {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/products/delete/${id}`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            if (res.status === 200) {
                Success(res.data.successMessage);
                props.update();
            } else {
                Error(res.data.errorMessage);
            }
        })
    }
    return (
        <div>
            <div className='admin-products table-container table-responsive'>
                <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Picture</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Supplier</th>
                            <th scope="col">Category</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.products.length > 0 && props.products.map((product, index) => {
                                return (
                                    product?.qty <= 3 && props.outOfStock ?
                                        <>
                                            <tr key={product?._id} style={{ borderBottom: '1px solid black' }}>
                                                <th>{index + 1}</th>
                                                <th scope="col">{product?.title}</th>
                                                <th scope="col"><img src={product?.productPicture && product?.productPicture?.url} className='rounded' width='62' height='62' alt='product' /></th>
                                                <td className='w-25' style={{ wordBreak: 'break-word' }}><div className='para' dangerouslySetInnerHTML={{ __html: product?.description }}></div></td>
                                                <th scope="col">{product?.price}$</th>
                                                <th scope="col"><span className='text-danger'>Out of Stock!</span></th>
                                                <th scope="col">{product?.category?.name}</th>
                                                <th>
                                                    <Link to={isAuthenticated().role === 1 ? `/admin/product/update/${product?._id}` : `/seller/product/update/${product?._id}`} className='btn' style={{ textDecoration: 'none' }}><EditOutlined /></Link>
                                                    <button className='btn' onClick={() => deleteHandler(product?._id)}><DeleteOutlined /></button>
                                                </th>
                                            </tr>
                                        </>
                                        :
                                        !props.outOfStock &&
                                        <>
                                            <tr key={product?._id} style={{ borderBottom: '1px solid black' }}>
                                                <th>{index + 1}</th>
                                                <th scope="col">{product?.title}</th>
                                                <th scope="col"><img src={product?.productPicture && product?.productPicture?.url} className='rounded' width='62' height='62' alt='product' /></th>
                                                <td className='w-25' style={{ wordBreak: 'break-word' }}><div className='para' dangerouslySetInnerHTML={{ __html: product?.description }}></div></td>
                                                <th scope="col">{product?.price}$</th>
                                                <th scope="col">{product?.qty <= 1 ? <span className='text-danger'>Out of Stock!</span> : product?.qty}</th>
                                                <th scope="col">{product?.category?.name}</th>
                                                <th>
                                                    <Link to={isAuthenticated().role === 1 ? `/admin/product/update/${product?._id}` : `/seller/product/update/${product?._id}`} className='btn' style={{ textDecoration: 'none' }}><EditOutlined /></Link>
                                                    <button className='btn' onClick={() => deleteHandler(product?._id)}><DeleteOutlined /></button>
                                                </th>
                                            </tr>
                                        </>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div >
    )
}
