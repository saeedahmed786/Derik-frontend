import React, { useEffect, useState } from 'react'
import axios from 'axios';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { UserLayout } from '../Components/Layouts/UserLayout';
import { Error, Success } from '../Components/Messages/messages';
import { listProducts } from '../Redux/Redux';
import { isAuthenticated } from '../Components/Auth/auth';
import { Paypal } from '../Components/Payments/Paypal'
import { Button } from 'antd';

export const Payment = (props) => {
  const dispatch = useDispatch('');
  const user = isAuthenticated();
  const [products, setProducts] = useState([]);

  const getCartProducts = async () => {
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/cart/get`, {
      headers: {
        'authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).then(res => {
      if (res.status === 200) {
        setProducts(res.data);
      } else {
        Error(res.data.errorMessage);
      }
    })


  }


  useEffect(() => {
    getCartProducts();
    return () => {

    }
  }, []);

  const totalPrice = products?.reduce((a, b) => a + b.qty * b.price.toString(), 0);

  const emptyCart = async () => {
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/cart/empty`, {
      headers: {
        'authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).then(res => {
      if (res.status === 200) {
        Success(res.data.successMessage);
        dispatch(listProducts());
      } else {
        Error(res.data.errorMessage)
      }
    })
  }

  const transactionSuccess = async (data) => {
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/orders/place-order`, {
      placed: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
      totalPrice: totalPrice,
      phone: user?.phone,
      name: user.firstName + " " + user.lastName,
      email: user.email,
      cartProducts: products,
      address: "address",
      paymentData: data
    }
      , {
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
    )
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          emptyCart();
          Success(res.data.successMessage);
          setTimeout(() => {
            props.history.push('/orders')
          }, 2000);
        } else {
          Error(res.data.errorMessage)
        }
      })

  }
  const transactionError = () => {

  }
  const transactionCanceled = () => {

  }

  return (
    <div>
      <UserLayout navbar>
        <div className='row payment' style={{ marginLeft: '100px' }}>
          <div className='col-md-8 pr-4'>
            <div style={{ width: '100%' }}>
              <div className='jumbotron jumbotron-fluid mt-4 border payment p-4'>
                <div>
                  <h4>Pay with Paypal</h4>
                  <div className='my-5'>
                    <Paypal
                      toPay={totalPrice}
                      onSuccess={transactionSuccess}
                      transactionError={transactionError}
                      transactionCanceled={transactionCanceled}
                    />
                  </div>
                </div>
              </div>
              <div className='jumbotron jumbotron-fluid mt-4 border payment p-4'>
                <div>
                  <h4>Pay Cash On Delivery</h4>
                  <div className='my-5'>
                    <Button type='primary' className='w-100' onClick={() => transactionSuccess({})}>Place Order</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-4 mt-5 px-4' style={{ borderLeft: '1px solid #dddde6' }}>
            <h6 className='text-muted'>PRICE DETAILS ({products?.length} Items)</h6>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='my-2'>
                <h6> Total Amount </h6>
              </div>
              <div className='mt-2' style={{ paddingLeft: '102px' }}>
                <h6>{products?.reduce((a, b) => a + b.qty * b.price.toString(), 0)}$</h6>
              </div>
            </div>
            {/* <div className='d-flex justify-content-between align-items-center'>
              <div className='my-2'>
                <h6> Total Amount </h6>
              </div>
              <div className='mt-2' style={{ paddingLeft: '102px' }}>
                <h6>{products?.reduce((a, b) => a + b.qty * b.price.toString(), 0) + products?.reduce((a, b) => a + b.qty * b.price.toString(), 0) * vat / 100}$</h6>
              </div>
            </div> */}
          </div>
        </div>
      </UserLayout>
    </div>
  )
}
