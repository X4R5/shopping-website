import React from 'react';
import Link from 'next/link';

function ProductCard({ product }) {

  let displayPrice;
  if (product.campaign) {
    const discountAmount = product.product_price * (product.discount / 100);
    const discountedPrice = product.product_price - discountAmount;
    displayPrice = (
      <>
        <p className="product-price text-decoration-line-through align-self-bottom">
          {product.product_price} TL
        </p>
        <h3 className="product-price" style={{ color: 'green' }}>
          {discountedPrice.toFixed(2)} TL
        </h3>
      </>
    );
  } else {
    displayPrice = (
      <p className="product-price align-self-bottom">
        {product.product_price} TL
      </p>
    );
  }

  return (
    <div className="product-card mx-2 bg-light py-3 my-3">
      <img
        src={product.product_image || "https://parcs.org.au/wp-content/uploads/2016/03/placeholder-image-red-1.png"}
        className="product-image card-img-top mx-auto"
        alt={product.product_name}
      />
      <div className="card-body d-flex flex-row justify-content-around mt-4">
        <div className="d-flex flex-column">

          <Link href={`/product/${product.product_id}`} passHref>
              {product.product_name}

          </Link>
          <div className="d-flex align-items-center">
            {displayPrice}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
