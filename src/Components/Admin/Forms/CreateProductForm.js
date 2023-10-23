import { TreeSelect } from 'antd';
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { Error, Success, Warning } from "../../Messages/messages";
import { Link } from 'react-router-dom';
import Loading from '../../Loading/Loading';
import { isAuthenticated } from '../../Auth/auth';

const { TreeNode } = TreeSelect;

export const CreateProductForm = () => {
    const [file, setFile] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [cat, setCat] = useState('');
    const [Seller, setSeller] = useState('');
    const [loading, setLoading] = useState(false);
    const [productData, setProductData] = useState({
        title: '',
        price: '',
        qty: ''
    });

    const { title, price, qty } = productData;

    /***********************************************onChange *******************************************/
    const handleProductChange = (e) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value
        });
    }

    const handleImageChange = (e) => {
        setFile(e.target.files[0])
    }
    const onCatChange = value => {
        setCat(value);
    };

    /************************************************ Submit **********************************************/

    const submitHandler = (e) => {
        e.preventDefault();
        if (
            !title ||
            !cat ||
            !price ||
            !description ||
            !file
        ) {
            Warning('All fields are required');
        }
        else {
            setLoading(true);
            let data = new FormData();
            data.append('title', title);
            data.append('description', description);
            data.append('price', price);
            data.append('qty', qty);
            data.append('Seller', Seller);
            data.append('category', cat);
            data.append('file', file);
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/products/create`, data, {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                if (res.status === 200) {
                    setLoading(false);
                    Success(res.data.successMessage);
                }
                else {
                    Error(res.data.errorMessage);
                }
            })
        }
    }

    /****************************************** Get Requests *******************************************/
    const fetchCategories = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/categories/get`).then(res => {
            if (res.status === 200) {
                setCategories(res.data);
            }
            else {
                Error(res.data.errorMessage);
            }
        })
    }


    useEffect(() => {
        fetchCategories();
        return () => {
        }
    }, []);

    return (
        <div className='w-75 p-4 products mb-4' style={{ marginTop: '10px', paddingTop: '47px', background: '#FFFFFF', boxShadow: '10px 10px 30px rgba(197, 200, 213, 0.76)', borderRadius: '20px' }}>
            {
                loading
                    ?
                    <Loading />
                    :
                    <div>
                        <form onSubmit={submitHandler}>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <h4 className='mb-5'>Create a Product</h4>
                                </div>
                                <div>
                                    {
                                        isAuthenticated().role === 1 ?
                                            <Link to='/admin/products' type="button" className="btn-close" aria-label="Close"></Link>
                                            :
                                            <Link to='/seller/products' type="button" className="btn-close" aria-label="Close"></Link>
                                    }
                                </div>
                            </div>
                            <div className="form-group mt-4">
                                <input type="text" className="form-control mb-2" id='title' name='title' placeholder="Enter Your Product Title" onChange={handleProductChange} />
                            </div>
                            <div className="form-group mt-4">
                                <input type="Number" className="form-control mb-2" name='price' placeholder="Enter Product's Price" onChange={handleProductChange} />
                            </div>
                            <div className="form-group mt-4">
                                <input type="qty" className="form-control mb-2" name='qty' placeholder="Enter Product's Qty" onChange={handleProductChange} />
                            </div>
                            <div className='mt-3'>
                                <ReactQuill placeholder="Product Description" theme="snow" value={description} onChange={setDescription} />
                            </div>
                            <div className='my-3'>
                                <input type="file" accept='image/*' name='file' onChange={handleImageChange} />
                            </div>
                            {/* <TreeSelect
                                showSearch
                                style={{ width: '100%' }}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                placeholder="Please select Seller"
                                allowClear
                                treeDefaultExpandAll
                                onChange={(val) => setSeller(val)}
                                className='mb-3'
                            >
                                {
                                    Sellers.map(supp => {
                                        return (
                                            <TreeNode value={supp.first_name + supp.last_name} title={supp.first_name + " " + supp.last_name} />
                                        )
                                    })
                                }
                            </TreeSelect> */}
                            <TreeSelect
                                showSearch
                                style={{ width: '100%' }}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                placeholder="Please select category"
                                allowClear
                                treeDefaultExpandAll
                                onChange={onCatChange}
                                className='mb-3'
                            >
                                {
                                    categories.map(cat => {
                                        return (
                                            <TreeNode value={cat._id} title={cat.name} />
                                        )
                                    })
                                }
                            </TreeSelect>
                            <button type="submit" size='large' className="btn btn-dark w-100 mt-4">Submit</button>
                        </form>
                    </div>
            }
        </div>
    )
}
