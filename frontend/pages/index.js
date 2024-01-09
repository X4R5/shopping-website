import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import DiscountedProductsSlider from '@/components/DiscountedProductsSlider';
import ProductsOfCategory from '@/components/ProductsOfCategory';

function HomePage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/products/categories/1');
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
        <ProductsOfCategory key={category.category_id} categoryId={category.category_id} categoryTitle={category.category_name}/>
      ))}
    </div>
  );
}

export default HomePage;
