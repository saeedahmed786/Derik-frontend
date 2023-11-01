import React from 'react'
import './index.css';
import { Route, Switch, withRouter } from 'react-router-dom'

import { OrdersManagement } from './Pages/Admin/Orders/OrdersManagement'
import { Product } from './Pages/Product/Product';
import { ProductCart } from './Pages/Cart/ProductCart';

import { Orders } from './Pages/Profile/Order&Returns';
import { Profile } from './Pages/Profile/profile';
import { EditProfile } from './Pages/Profile/EditProfile';

import AdminRoute from './Routes/AdminRoute';
import { GetCategories } from './Pages/Admin/Categories/GetCategories';
import { AdminProducts } from './Pages/Admin/Products/Products';
import { AdminUpdateProduct } from './Pages/Admin/Products/UpdateProduct';
import { Payment } from './Pages/Payment';
import { DefaultComp } from './Pages/404';
import { AllProducts } from './Pages/AllProducts/AllProducts';
import { Footer } from './Components/Footer/Footer';
import { NotAuthorisedPage } from './Pages/403';
import { Login } from './Pages/Auth/Login/Login';
import { Signup } from './Pages/Auth/Signup/Signup';
import { Navbar } from './Components/Navbar';
import { CreateProducts } from './Pages/Admin/Products/CreateProducts';
import { Sellers } from './Pages/Admin/Sellers/Sellers';
import SellerRoute from './Routes/SellerRoute';
import { SellerProducts } from './Pages/Seller/Products/Products';
import { SellerUpdateProduct } from './Pages/Seller/Products/UpdateProduct';
import { SellerCreateProducts } from './Pages/Seller/Products/CreateProducts';
import { SellerOrdersManagement } from './Pages/Seller/Orders/OrdersManagement';
import { AdminUsers } from './Pages/Admin/Users/Users';

const App = () => {

  console.log(process.env.REACT_APP_BACKEND_URL)

  return (
    <div>
      <div style={{ minHeight: '95vh' }}>
        <Navbar />
        <div style={{ marginTop: "100px" }}>
          <Switch>
            <Route exact path='/' component={AllProducts} />
            <Route exact path='/orders' component={Orders} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/profile/update/:id' component={EditProfile} />


            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/product/:id' component={Product} />
            <Route exact path='/cart' component={ProductCart} />
            <Route exact path='/checkout/payment' component={Payment} />

            <AdminRoute exact path='/admin/all-categories' component={GetCategories} />
            <AdminRoute exact path='/admin/products' component={AdminProducts} />
            <AdminRoute exact path='/admin/product/update/:id' component={AdminUpdateProduct} />
            <AdminRoute exact path='/admin/create-products' component={CreateProducts} />
            <AdminRoute exact path='/admin/users' component={AdminUsers} />
            <AdminRoute exact path='/admin/sellers' component={Sellers} />
            <AdminRoute exact path='/admin/orders' component={OrdersManagement} />

            <SellerRoute exact path='/seller/products' component={SellerProducts} />
            <SellerRoute exact path='/seller/product/update/:id' component={SellerUpdateProduct} />
            <SellerRoute exact path='/seller/create-products' component={SellerCreateProducts} />
            <SellerRoute exact path='/seller/orders' component={SellerOrdersManagement} />

            <Route exact path='/no-permission' component={NotAuthorisedPage} />
            <Route component={DefaultComp} />
          </Switch>
        </div>
      </div>
      <Footer />
    </div>

  )
}

export default withRouter(App);