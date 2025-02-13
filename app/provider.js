"use client"

import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { UserDetailsConstext } from './_context/UserDetailContext';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const Provider = ({ children }) => {

  const { user } = useUser();
  const [userDetail, setUserDetail] = useState ([]);

  useEffect(() => {
    user && VerifyUser();
  }, [user])

  const VerifyUser = async () => {
    const dataResult = await axios.post('/api/verify-user', {
      user: user
    });
    setUserDetail(dataResult.data.result);
   // console.log(dataResult.data);
  }



  return (
   <UserDetailsConstext.Provider value={{userDetail, setUserDetail}}>
      
    <div>
      {children}
    </div>
     
   </UserDetailsConstext.Provider>
  )
}

export default Provider
