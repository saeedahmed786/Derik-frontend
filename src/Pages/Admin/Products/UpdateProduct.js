import React from 'react'
import { UpdateProductForm } from '../../../Components/Admin/Forms/UpdateProductForm';
import './product.css'
import { Layout } from '../../../Components/Layouts/Layout';

export const AdminUpdateProduct = (props) => {
  const productId = props.match.params.id;

  return (
    <Layout sidebar>
      <div className='d-flex justify-content-center align-items-center' style={{ marginTop: '10px' }}>
        <UpdateProductForm  productId = {productId}/>
      </div>
    </Layout>
  )
}
