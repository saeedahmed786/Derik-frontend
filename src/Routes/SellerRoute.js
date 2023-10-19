import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from '../Components/Auth/auth';

  const SellerRoute = ({component: Component, ...rest}) =>  {
    return (
        <>
       <Route  
           {...rest}
           render = {(props) => 
               isAuthenticated() && isAuthenticated().role === 2 ? (
                   <Component {...props} />
               ) : (
                   <Redirect to = '/no-permission'/>
               )
           }
           />
           </>
    )
};

export default SellerRoute;
