import React, { useState, useEffect } from 'react';
import CarouselItem from './CarouselItem';

function DiscountedProductsSlider() {
  const [discountedProducts, setDiscountedProducts] = useState([]);

  useEffect(() => {
    const fetchDiscountedProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/products/d/discounted');
        if (!response.ok) throw new Error('Indirimli ürünler çekilemedi.');
        const products = await response.json();
        setDiscountedProducts(products);
        console.log("a", products);
      } catch (error) {
        console.error('Indirimli ürünler çekilirken hata oluştu:', error);
      }
    };

    fetchDiscountedProducts();
  }, []);

  if (!discountedProducts || discountedProducts.length === 0) {
    return null;
  }

  const groupedProducts = [];
  for (let i = 0; i < discountedProducts.length; i += 3) {
    groupedProducts.push(discountedProducts.slice(i, i + 3));
  }

  return (
    <div className="discounted-products-container">
      <h3 className="discounted-products-heading">Kampanyalı Ürünler</h3>

      <div id="firsatUrunleri" className="discounted-products-carousel carousel carousel-dark slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {groupedProducts.map((group, index) => (
            <CarouselItem key={index} active={index === 0} products={group} />
          ))}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#firsatUrunleri" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Önceki</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#firsatUrunleri" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Sonraki</span>
        </button>
      </div>
    </div>
  );
}

export default DiscountedProductsSlider;