import { TreeSelect } from 'antd';
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { Error, Success, Warning } from "../../Messages/messages";
import { Link } from 'react-router-dom';
import Loading from '../../Loading/Loading';
import { isAuthenticated } from '../../Auth/auth';
import { DeleteFilled } from "@ant-design/icons";


const { TreeNode } = TreeSelect;

export const UpdateProductForm = (props) => {
    const productId = props.productId;
    const [productPicture, setProductPicture] = useState([]);
    const [file, setFile] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [mainCat, setMainCat] = useState('');
    const [product, setProduct] = useState({});
    const [Seller, setSeller] = useState('');
    const [loading, setLoading] = useState(false);
    const [productData, setProductData] = useState({
        title: '',
        price: '',
        qty: '',
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
        setFile([
            ...file,
            e.target.files[0]
        ])
    }

    const onMainCatChange = value => {
        setMainCat(value);
    };

    const getProductById = async () => {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products/product/${productId}`).then(res => {
            if (res.status === 200) {
                setProduct(res.data);
                setProductPicture(res.data.productPicture);
                setProductData(res.data);
                setDescription(res.data.description);
                setMainCat(res.data.category?._id);
                setSeller(res.data.Seller);
            } else {
                Error(res.data.errorMessage);
            }
        })
    }

    /************************************************ Submit **********************************************/

    const submitHandler = (e) => {
        e.preventDefault();
        if (
            !title ||
            !mainCat ||
            !price ||
            !description
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
            data.append('category', mainCat);
            data.append('productPicture', productPicture);
            if (file?.length > 0) {
                for (let pic of file) {
                    data.append('file', pic);
                }
            }
            axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/products/update/${productId}`, data, {
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
            }).catch(err => console.log(err));
        }
    }

    /****************************************** Get Categories *******************************************/
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
        getProductById();
        return () => {
        }
    }, []);


    return (
        <div className='w-75 p-4 products mb-5' style={{ marginTop: '10px', paddingTop: '47px', background: '#FFFFFF', boxShadow: '10px 10px 30px rgba(197, 200, 213, 0.76)', borderRadius: '20px' }}>
            {
                loading
                    ?
                    <Loading />
                    :
                    <div>
                        <form onSubmit={submitHandler}>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <h4 className='mb-5'>Update Product</h4>
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
                                <input type="text" className="form-control mb-2" id='title' value={title} name='title' placeholder="Enter Your Product Title" onChange={handleProductChange} />
                            </div>
                            <div className="form-group mt-4">
                                <input type="Number" className="form-control mb-2" value={price} id='price' name='price' placeholder="Enter Product's Price" onChange={handleProductChange} />
                            </div>
                            <div className="form-group mt-4">
                                <input type="Number" value={qty} className="form-control mb-2" id='qty' name='qty' placeholder="Enter Product Qty" onChange={handleProductChange} />
                            </div>
                            <div className='mt-3'>
                                <ReactQuill placeholder="Product Description" theme="snow" value={description} onChange={(val) => setDescription(val)} />
                            </div>
                            <div className='my-3'>
                                <input type="file" name='file' multiple onChange={handleImageChange} />
                                <div className='my-4'>
                                    {
                                        file?.length === 0 ?
                                            <div className='d-flex flex-wrap gap-4 align-items-center'>
                                                {
                                                    productPicture?.length > 0 && productPicture?.map(f => {
                                                        return (
                                                            <div style={{ position: "relative" }}>
                                                                {/* <button type='button' style={{ position: "absolute", top: "-10px", right: "-10px", color: "white" }} onClick={() => setFile(prev => prev?.filter(p => p !== f))}>
                                                                    <DeleteFilled />
                                                                </button> */}
                                                                <img src={f?.url} style={{ width: "100px", height: "100px" }} alt="Product" />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            :
                                            <div className='d-flex flex-wrap gap-4 align-items-center'>
                                                {
                                                    file?.length > 0 && file?.map(f => {
                                                        return (
                                                            <div style={{ position: "relative" }}>
                                                                <button type='button' style={{ position: "absolute", top: "-10px", right: "-10px", color: "white" }} onClick={() => setFile(prev => prev?.filter(p => p !== f))}>
                                                                    <DeleteFilled />
                                                                </button>
                                                                <img src={URL.createObjectURL(f)} style={{ width: "100px", height: "100px" }} alt="Product" />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                    }
                                </div>
                            </div>
                            <TreeSelect
                                showSearch
                                style={{ width: '100%' }}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                placeholder="Please select main category"
                                allowClear
                                treeDefaultExpandAll
                                onChange={onMainCatChange}
                                className='mb-3'
                                value={mainCat}
                            >
                                {
                                    categories.map(mainCat => {
                                        return (
                                            <TreeNode value={mainCat._id} title={mainCat.name} />
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
