import React from 'react';
import ProductCard from './ProductCard';

function CarouselItem({ active = false, products }) {
  const itemClass = active ? 'carousel-item active' : 'carousel-item';

  return (
    <div className={itemClass}>
      <div className="card-wrapper container-sm d-flex justify-content-center">
        {products && products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default CarouselItem;
