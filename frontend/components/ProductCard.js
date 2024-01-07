import React from 'react';
import Link from 'next/link';

function ProductCard({ product }) {
  return (
    <div className="product-card mx-2 bg-light py-3 my-3">
      <img
        src={product.product_image || "https://parcs.org.au/wp-content/uploads/2016/03/placeholder-image-red-1.png"}
        className="product-image card-img-top mx-auto"
        alt={product.product_name}
      />
      <div className="card-body d-flex flex-row justify-content-around mt-4">
        <div className="d-flex flex-column">
          <Link href={`/product/${product.id}`} passHref>
              {product.product_name}

          </Link>
          {product.product_price && <p className="product-price text-decoration-line-through align-self-bottom">
            {product.product_price} TL
          </p>}
        </div>
        <div className="d-flex align-items-center">
          {product.discountPrice && <h3 className="product-price" style={{ color: 'green' }}>{product.discountPrice} TL</h3>}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
