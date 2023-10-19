import React from 'react'
import 'react-quill/dist/quill.snow.css';
import { CreateProductForm } from '../../../Components/Admin/Forms/CreateProductForm';
import { Layout } from '../../../Components/Layouts/Layout';
import './product.css'

export const CreateProducts = () => {

  return (
    <Layout sidebar>
      <div className='d-flex justify-content-center align-items-center' style={{ marginTop: '10px' }}>
        <CreateProductForm />
      </div>
    </Layout>
  )
}
