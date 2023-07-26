import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoggedInUser, signOutUserAsync } from '../authSlice'
import { Navigate } from 'react-router-dom';

const Logout = () => {
    const user = useSelector(selectLoggedInUser);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(signOutUserAsync());
    },[dispatch])

  return (
    <>
    {!user && <Navigate to={'/login'} replace={true}></Navigate>}
    </>
  )
}

export default Logout
