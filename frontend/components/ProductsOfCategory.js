import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Link from 'next/link';

function ProductsOfCategory({ categoryId, categoryTitle }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/products/homepage/${categoryId}`);
        const data = await response.json();
        setProducts(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div className="my-5 container products-category-container">
      <div className="my-2 d-flex justify-content-between align-items-center category-title">
        <h2 className='mx-2'>{categoryTitle}</h2>
        <div className='view-all-link mx-2'>
          <Link href={`/category/${categoryId}`}>
            <a>Tümünü Gör</a>
          </Link>
          <span className="arrow">{'>'}</span>
        </div>
      </div>
      <div className="my-3 d-flex flex-row">
        {products.map((product) => (
          <div className="mb-4 mx-2" key={product.id}>
            <ProductCard key={product.id} product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsOfCategory;
