import React from 'react'
import 'react-quill/dist/quill.snow.css';
import { CreateProductForm } from '../../../Components/Admin/Forms/CreateProductForm';
import { SellerLayout } from '../../../Components/Layouts/SellerLayout';
import './product.css'

export const SellerCreateProducts = () => {

  return (
    <SellerLayout sidebar>
      <div className='d-flex justify-content-center align-items-center' style={{ marginTop: '10px' }}>
        <CreateProductForm />
      </div>
    </SellerLayout>
  )
}
