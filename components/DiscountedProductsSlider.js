import React from 'react';
import CarouselItem from './CarouselItem';

function DiscountedProductsSlider() {
  return (
    <div className="discounted-products-container">
      <h3 className="discounted-products-heading">Kampanyalı Ürünler</h3>

      <div id="firsatUrunleri" className="discounted-products-carousel carousel carousel-dark slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <CarouselItem active={true} />
          <CarouselItem />
          <CarouselItem />
          <CarouselItem />
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
