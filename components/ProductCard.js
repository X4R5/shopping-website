import React from 'react';

function ProductCard() {
  return (
    <div className="product-card mx-2 bg-light py-3 my-3">
      <img
        src="https://parcs.org.au/wp-content/uploads/2016/03/placeholder-image-red-1.png"
        className="product-image card-img-top mx-auto"
        alt="..."
      />
      <div className="card-body d-flex flex-row justify-content-around mt-4">
        <div className="d-flex flex-column">
          <a className="product-title card-title link-underline link-underline-opacity-0" href="#">
            Ürün İsmi
          </a>
          <p className="product-price text-decoration-line-through align-self-bottom">
            100TL
          </p>
        </div>
        <div className="d-flex align-items-center">
          <h3 className="product-price" style={{ color: 'green' }}>50TL</h3>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
