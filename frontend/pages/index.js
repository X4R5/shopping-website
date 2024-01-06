import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import DiscountedProductsSlider from '@/components/DiscountedProductsSlider';
import ProductsOfCategory from '@/components/ProductsOfCategory';

function HomePage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost/api/products/categories/1');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <Navbar />
      <DiscountedProductsSlider />
      {categories.map(category => (
        <ProductsOfCategory key={category.id} categoryId={category.id} />
      ))}
    </div>
  );
}

export default HomePage;
