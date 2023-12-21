import React from 'react';
import ProductCard from './ProductCard';

function CarouselItem({ active = false }) {
  const itemClass = active ? 'carousel-item active' : 'carousel-item';

  const itemContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
  };

  return (
    <div className={itemClass}>
      <div className="card-wrapper container-sm d-flex justify-content-center" style={itemContainerStyle}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}

export default CarouselItem;