import { Button, Input, Tabs } from 'antd';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { SellerLayout } from '../../../Components/Layouts/SellerLayout';
import { Error } from '../../../Components/Messages/messages';
import { SharedProducts } from '../../../Components/Shared/Products';

const { TabPane } = Tabs;

export const SellerProducts = () => {
    const [mainProducts, setMainProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState("");

    const searchHandler = () => {
        setProducts(mainProducts?.filter(product => product?.title?.toLowerCase().includes(searchText?.toLowerCase())));
    }

    const getAllProducts = async () => {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products/seller`, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            if (res.status === 200) {
                setProducts(res.data);
                setMainProducts(res.data);
            } else {
                Error(res.data.errorMessage);
            }
        })
    }

    useEffect(() => {
        getAllProducts();
        return () => {
        }
    }, []);

    return (
        <SellerLayout sidebar>
            <div className='d-flex justify-content-end mb-2 py-4'>
                <Link to='/seller/create-products' className='btn px-4' style={{ background: '#364c64', color: 'white', borderRadius: '23px' }}>Create Product</Link>
            </div>
            <div className='my-4'>
                <Input size='large' placeholder='Search here' onChange={(e) => setSearchText(e.target.value)} />
                <br />
                <Button size='large' className='mt-4' onClick={searchHandler}>Search</Button>
            </div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="All" key="1">
                    <SharedProducts update={getAllProducts} products={products} />
                </TabPane>
                <TabPane tab="Out Of Stock" key="2">
                    <SharedProducts update={getAllProducts} products={products} outOfStock={1} />
                </TabPane>
            </Tabs>
        </SellerLayout>
    )
}
