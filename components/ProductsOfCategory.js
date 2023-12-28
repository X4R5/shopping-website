import React from 'react';
import ProductCard from './ProductCard';

function ProductsOfCategory({ categoryId = 0 }) {
  const categoryTitle = "Kategori Adı";

  const products = [
    { id: 1, name: 'Ürün 1', price: '50TL' },
    { id: 2, name: 'Ürün 2', price: '60TL' },
    { id: 3, name: 'Ürün 3', price: '70TL' },
    { id: 4, name: 'Ürün 4', price: '80TL' },
  ];

  return (
    <div className="my-5 container products-category-container">
      <div className="my-2 d-flex justify-content-between align-items-center category-title">
        <h2 className='mx-2'>{categoryTitle}</h2>
        <div className='view-all-link mx-2'>
          <a href="#">Tümünü Gör</a>
          <span className="arrow">{'>'}</span>
        </div>
      </div>
      <div className="my-3 d-flex flex-row">
        {products.map((product) => (
          <div className="mb-4 mx-2" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsOfCategory;
