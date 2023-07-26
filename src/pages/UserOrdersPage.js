import React from 'react'
import NavBar from '../features/NavBar/NavBar'
import { UserOrders } from '../features/User/UserOrders'

const UserOrdersPage = () => {
  return (
    <div>
      <NavBar>
        <h2 className='mx-auto text-2xl'>My Orders</h2>
        <UserOrders/>
      </NavBar>
    </div>
  )
}

export default UserOrdersPage
