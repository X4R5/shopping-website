import React from 'react';
import Navbar from '../components/Navbar';
import DiscountedProductsSlider from '@/components/DiscountedProductsSlider';
import ProductsOfCategory from '@/components/ProductsOfCategory';

function HomePage() {
  return (
    <div>
      <Navbar />
      <DiscountedProductsSlider />
      <ProductsOfCategory />
    </div>
  );
}

export default HomePage;
