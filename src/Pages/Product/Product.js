import { Button, InputNumber } from 'antd';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { listProducts } from '../../Redux/Redux';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { UserLayout } from '../../Components/Layouts/UserLayout';
import { isAuthenticated } from '../../Components/Auth/auth';
import { Error, Success } from '../../Components/Messages/messages';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import './Product.css'
import Loading from '../../Components/Loading/Loading';

export const Product = (props) => {
    const productId = props.match.params.id;
    let userId = isAuthenticated()._id;
    const [product, setProduct] = useState({});
    const [qtyToShop, setQtyToShop] = useState('1');
    const [pic, setPic] = useState('');
    const [loading, setLoading] = useState(false);


    const getProduct = async () => {
        setLoading(true);
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products/product/${productId}`).then(res => {
            setLoading(false);
            if (res.status === 200) {
                setProduct(res.data);
                setPic(res.data.productPicture?.url);
            } else {
                Error(res.data.errorMessage);
            }
        });

    }


    useEffect(() => {
        getProduct();
        return () => {

        }
    }, [productId]);

    const dispatch = useDispatch();
    const handleCart = async () => {
        if (isAuthenticated()) {
            if (product.qty === 0) {
                Error('Product out of stock!')
            } else {
                setLoading(true);
                const requestData = {
                    title: product.title,
                    price: product.price,
                    productId,
                    userId,
                    seller: product?.seller,
                    category: product.category,
                    image: product.productPicture,
                    qty: qtyToShop,
                    totalQty: product?.qty,
                    supplier: product?.supplier
                };
                await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/cart/add-to-cart`, requestData, {
                    headers: {
                        'authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(res => {
                    setLoading(false);
                    if (res.status === 200) {
                        Success(res.data.successMessage);
                        dispatch(listProducts(userId));
                    }
                    else {
                        Error(res.data.errorMessage)
                    }
                })
            }
        } else {
            Error("Please login to add to cart");
        }
    }

    return (
        <UserLayout navbar>
            {
                loading
                    ?
                    <Loading />

                    :

                    <>
                        <div className='row product-page'>
                            <div className='col-md-7 px-3'>
                                <div>
                                    <img src={product?.productPicture?.url} className="w-100" style={{ maxHeight: "500px" }} alt="..." />
                                </div>
                            </div>
                            <div className="col-md-5 mt-2 pl-4">
                                <div className='ml-3'>
                                    <h4>
                                        {product.title}
                                    </h4>
                                    <h5 className='mt-2'>
                                        <span>{product.price}$</span>
                                    </h5>
                                    <h6 style={{ color: '#03a685' }} className='font-weight-bold'>
                                        Inclusive of all taxes
                                    </h6>

                                    <div className='mt-4'>
                                        <h5>Add <span>Quantity</span></h5>
                                        <InputNumber min={1} max={100000} defaultValue={1} onChange={(value) => setQtyToShop(value)} />
                                        {
                                            <p className='mt-2'>{product.qty <= 1 && <span className='text-danger fw-bolder'>Product is almost out of stock!</span>}</p>
                                        }
                                    </div>
                                    <div className='product-btn my-4'>
                                        <Button onClick={handleCart} size='large' icon={<ShoppingCartOutlined style={{ fontSize: '26px' }} />}>
                                            Add to Bag
                                        </Button>
                                    </div>
                                    <div>
                                        <h4>Description:</h4>
                                        <p className='mr-5' style={{ wordBreak: 'break-word' }}>
                                            <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </UserLayout >
    )
}
