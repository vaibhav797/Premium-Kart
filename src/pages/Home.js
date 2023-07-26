import React from 'react'
import NavBar from '../features/NavBar/NavBar';
import ProductList from '../features/ProductList/ProductList';
import Footer from '../features/common/Footer';

const Home = () => {
  return (
    <div>
      <NavBar>
        <ProductList></ProductList>
      </NavBar>
      <Footer/>
    </div>
  )
}

export default Home
