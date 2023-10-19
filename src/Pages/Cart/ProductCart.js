import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, InputNumber } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { CaretDownOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { listProducts } from '../../Redux/Redux';
import { useHistory } from 'react-router-dom';
import { isAuthenticated } from '../../Components/Auth/auth';
import { Error, Success } from '../../Components/Messages/messages';
import { UserLayout } from '../../Components/Layouts/UserLayout';
import Loading from '../../Components/Loading/Loading';



export const ProductCart = (props) => {
  const history = useHistory();
  const userId = isAuthenticated()._id;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [mainProduct, setMainProduct] = useState({});
  const [isQtyModalVisible, setIsQtyModalVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState('');
  const [qtyToShop, setQtyToShop] = useState('');
  const [vat, setVat] = useState();

  const getCartProducts = async () => {
    setLoading(true);
    await axios.get(`/api/cart/get`, {
      headers: {
        'authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).then(res => {
      setLoading(false);
      if (res.status === 200) {
        setProducts(res.data);
        setTotalPrice(res.data?.reduce((a, b) => a + b.qty * b?.price?.toString(), 0));
      }
      else if (res.status === 201) {
        setProducts([]);
      } else {
        Error(res.data.errorMessage);
      }
    })


  }


  const getProductById = async (prId) => {
    setLoading(true);
    axios.get(`/api/cart/get-product`, { params: { userId: userId, productId: prId } }).then(res => {
      setLoading(false);
      if (res.status === 200) {
        setProduct(res.data);
        getMainProductById(prId);
        showQtyModal();
      } else {
        Error(res.data.errorMessage);
      }
    });

  }

  const getMainProductById = async (prId) => {
    setLoading(true);
    axios.get(`/api/products/get/${prId}`).then(res => {
      setLoading(false);
      if (res.status === 200) {
        setMainProduct(res.data);
      } else {
        Error(res.data.errorMessage);
      }
    });

  }

  useEffect(() => {
    if (isAuthenticated()) {
      getCartProducts();
    }
    return () => {

    }
  }, []);


  const showQtyModal = () => {
    setIsQtyModalVisible(true);
  };

  const handleQtyOk = () => {
    setIsQtyModalVisible(false);
  };

  const handleQtyCancel = () => {
    setIsQtyModalVisible(false);
  };

  const dispatch = useDispatch();

  const removeHandler = async (cartId) => {
    await axios.delete(`/api/cart/delete/${cartId}`, {
      headers: {
        'authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).then(res => {
      if (res.status === 200) {
        Success(res.data.successMessage)
        dispatch(listProducts(userId));
        getCartProducts();
      } else {
        Error(res.data.errorMessage)
      }
    })
  }



  const saveQtyToDb = async (productId) => {
    if (qtyToShop > mainProduct?.qty - 1) {
      Error('Product out of stock!')
    } else {
      await axios.put(`/api/cart/update/qty/${productId}`, { qty: qtyToShop, userId, productId: productId }, {
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(res => {
        if (res.status === 200) {
          Success(res.data.successMessage);
          setIsQtyModalVisible(false);
          getCartProducts();
        } else {
          Error(res.data.errorMessage);
        }
      })
    }
  }


  const moveToAddress = () => {
    if (totalPrice > 0) {
      history.push('/checkout/payment');
    }
  }
  console.log(products);
  return (
    <UserLayout navbar>
      <div className='cart'>
        <div>
          {
            loading
              ?
              <Loading />
              :
              <div className='inner'>
                {
                  products.length === 0 ?
                    <UserLayout navbar>
                      <div className='' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div>
                          <div className='text-muted text-center'>
                            <h4 className='mb-1' style={{ color: '#424553', fontSize: '20px' }}>Hey It feels so light!</h4>
                            <p>There is nothing in your bag. Let's add some items.</p>
                          </div>
                          <a href='/' className='btn w-100' style={{ border: '1px solid #2a3e53', color: '#2a3e53', fontWeight: '682', fontSize: '14px', borderRadius: '2px', textTransform: 'uppercase', padding: '10px' }}>Add</a>
                        </div>
                      </div>
                    </UserLayout>
                    :
                    <>
                      <div className='row'>
                        <div className='col-md-8 pr-4'>
                          <div style={{ background: '#e5f6f2' }}>
                            <h6 className='py-2 pl-2'>You have got {products?.length} Item(s) for {products?.reduce((a, b) => a + b?.qty * b.price?.toString(), 0)}$</h6>
                            {
                              products?.map(prod => {
                                return (
                                  <div className='row border mb-4' style={{ padding: '10px', background: 'white', marginLeft: '10px', marginRight: '10px', marginBottom: '10px' }}>
                                    <div className='col-md-3'>
                                      <img src={prod.image?.url} className='pl-2' alt={prod.title} width='121' height='121' />
                                    </div>
                                    <div className='col-md-4 ml-4'>
                                      <div>
                                        <h4>{prod.title}</h4>
                                        <p>{prod.subTitle}</p>
                                        {/* <p className='text-muted mt-0 pt-0'>Sold By: Saeed Ahmed</p> */}
                                        <a onClick={() => getProductById(prod?.productId)}>
                                          <span className='font-weight-bold'>
                                            <span>Qty: {prod.qty}</span>
                                            <CaretDownOutlined />
                                          </span>
                                        </a>
                                      </div>
                                    </div>
                                    <div className='col-md-4'><span className='fw-bold'>{prod.price * prod.qty}$</span></div>
                                    <div className=''>
                                      <button className='border border-bottom w-100 mt-2' style={{ border: 'none', background: 'white', height: '40px', fontWeight: 'bolder', color: '#696b79' }} onClick={() => removeHandler(prod.productId)}>Remove</button>
                                    </div>
                                  </div>
                                )
                              })

                            }
                          </div>
                        </div>

                        <Modal title='Select Amount' footer={false} width={380} visible={isQtyModalVisible} onOk={handleQtyOk} onCancel={handleQtyCancel}>
                          <h4>Select Amount</h4>
                          <InputNumber min={1} max={100000} defaultValue={product?.qty} value={qtyToShop} onChange={(value) => setQtyToShop(value)} />
                          <div className='text-center mt-2'>
                            <Button onClick={() => saveQtyToDb(product?.productId)}>Save</Button>
                          </div>
                        </Modal>

                        <div className='col-md-4 mt-4'>
                          <h6>Price Details ({products?.length} Items)</h6>
                          <div className='d-flex justify-content-between align-items-center'>
                            <div className='my-2'>
                              <h6> Total Amount </h6>
                            </div>
                            <div className='mt-2' style={{ paddingLeft: '102px' }}>
                              <h6>{products?.reduce((a, b) => a + b?.qty * b?.price?.toString(), 0)}$</h6>
                            </div>
                          </div>
                          {/* <div className='d-flex justify-content-between align-items-center'>
                            <div className='my-2'>
                              <h6> Total Amount </h6>
                            </div>
                            <div className='mt-2' style={{ paddingLeft: '102px' }}>
                              <h6>{products?.reduce((a, b) => a + b.qty * b?.price?.toString(), 0) + products?.reduce((a, b) => a + b.qty * b?.price?.toString(), 0) * vat / 100}$</h6>
                            </div>
                          </div> */}
                          <div className='w-100 mt-4'>
                            <button onClick={() => isAuthenticated() && moveToAddress()} className='btn my-2 w-100' style={{ background: '#2a3e53', color: 'white' }}>Place Order</button>
                          </div>
                        </div>
                      </div>
                    </>
                }
              </div>
          }
        </div>
      </div>
    </UserLayout >
  )
}
