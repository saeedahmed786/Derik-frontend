import React from 'react'
import { AdminSideBar } from '../Admin/adminSideBar'

export const Layout = (props) => {
  return (
    <div className='sidebar mt-5'>
      {
        props.sidebar ?
          <div className='row layouts'>
            <div className='col-md-2'>
              <AdminSideBar />
            </div>
            <div className='col-md-10 bg-light'>
              <div className='admin-layout'>
                <div className='bg-white border-bottom p-4 pb-2' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div><h5>Dashboard </h5></div>
                </div>
              </div>
              <div className='px-0'>
                {props.children}
              </div>
            </div>

          </div>
          :
          props.children
      }

    </div>
  )
}
