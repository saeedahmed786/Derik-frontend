import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './AllProducts.css'
import { ProductCard } from '../../Components/Products/ProductCard';
import { Error } from '../../Components/Messages/messages';
import { UserLayout } from '../../Components/Layouts/UserLayout';
import { Checkbox, Input } from 'antd';
const { Search } = Input;

export const AllProducts = () => {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checkedValue, setCheckedValue] = useState("");
    const [mainProducts, setMainProducts] = useState([]);

    const searchHandler = (val) => {
        setProducts(mainProducts?.filter(product => product?.title?.toLowerCase().includes(val?.toLowerCase())));
    }

    const getAllProducts = async () => {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products/get`).then(res => {
            if (res.status === 200) {
                setProducts(res.data);
                setMainProducts(res.data);
            } else {
                Error(res.data.errorMessage);
            }
        })
    }

    const getProductsByCategory = async (id) => {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/products/cat/${id}`).then(res => {
            if (res.status === 200) {
                setProducts(res.data.products);
            } else {
                Error(res.data.errorMessage);
            }
        })
    }
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
        location.search ? getProductsByCategory(location.search.substring(1)) : getAllProducts();
        getAllCategories();
        return () => {

        }
    }, []);


    return (
        <UserLayout navbar>
            <div className='all-products mb-5 pb-5'>
                <div className='my-4 mx-5 d-flex align-items-center justify-content-center'>
                    <Search
                        placeholder="Search here..."
                        allowClear
                        style={{ width: "100%", maxWidth: "400px" }}
                        enterButton="Search"
                        size="large"
                        onSearch={searchHandler}
                    />
                    {/* <Input style={{ width: "100%", maxWidth: "300px" }} size='large' placeholder='Search here' onChange={(e) => setSearchText(e.target.value)} />
                    <br />
                    <Button type='primary' size='large' color='primary' className='mt-2 px-4' onClick={searchHandler}>Search</Button> */}
                </div>
                <div className='row main-row pt-0 gx-5'>
                    <div className='col-md-2 border'>
                        <div className='px-3'>
                            <div className='px-3'>
                                <Checkbox checked={checkedValue === "all"} onChange={() => { setCheckedValue("all"); getAllProducts() }}>All Categories</Checkbox>
                            </div>

                            {
                                categories.length > 0 && categories.map(category => {
                                    return (
                                        <div id="menuContainer" >
                                            <div className="menuItem first d-flex justify-content-between px-3">
                                                <Checkbox checked={category?._id === checkedValue} onChange={() => { setCheckedValue(category?._id); getProductsByCategory(category._id) }}>{category.name}</Checkbox>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='col-md-10 px-5'>
                        <div className='row Dêrik-online-shop-1'>
                            {
                                products.length > 0 && products.map((product, index) => {
                                    return (
                                        <div className='col-md-4 col-lg-3'>
                                            <ProductCard product={product} />
                                        </div>

                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    )
}
