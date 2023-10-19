import React from 'react'
import { UpdateProductForm } from '../../../Components/Admin/Forms/UpdateProductForm';
import './product.css'
import { SellerLayout } from '../../../Components/Layouts/SellerLayout';

export const SellerUpdateProduct = (props) => {
  const productId = props.match.params.id;

  return (
    <SellerLayout sidebar>
      <div className='d-flex justify-content-center align-items-center' style={{ marginTop: '10px' }}>
        <UpdateProductForm productId={productId} />
      </div>
    </SellerLayout>
  )
}
