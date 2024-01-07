import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function OrderCard({ order }) {
  const additionalProducts = order.products.length > 2 ? order.products.length - 2 : 0;

  // Reversing the product array for proper z-index stacking
  console.log(order)
  const displayProducts = order.products.slice(0, 2).reverse();
  console.log(displayProducts[1]);
  return (
    <div className="card mb-3" style={{ overflow: 'hidden' }}> {/* Prevent overflow */}
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            {/* Padding to offset the negative margin */}
            <div className="d-flex align-items-center" style={{ paddingLeft: '20px' }}>
              {/* Display reversed product images for correct stacking */}
              {displayProducts.map((product, index) => (
                <img key={index} src={product[0].product_image} alt={product[0].product_name} className="rounded-circle"
                     style={{
                       width: '60px', height: '60px', objectFit: 'cover',
                       position: 'relative',
                       zIndex: index + 1, 
                       marginLeft: '-30px',
                       border: '2px solid white'
                     }} />
              ))}
              {additionalProducts > 0 && (
                <div className="rounded-circle bg-secondary d-flex justify-content-center align-items-center"
                     style={{
                       width: '60px', height: '60px',
                       marginLeft: '-30px',
                       color: 'white',
                       zIndex: displayProducts.length + 1,
                       border: '2px solid white'
                     }}>
                  +{additionalProducts}
                </div>
              )}
            </div>

            <div className="d-flex align-items-center justify-content-between ms-3">
                <div className="mx-5">
                    <div>Sipariş no {order.id}</div>
                    <div>{order.date}</div>
                </div>
                
                <div className='mx-5'><FontAwesomeIcon icon={faCheckCircle} className="text-success" /> {order.status}</div>

            </div>
        </div>
          <div className="text-end">
            <div>{order.totalPrice.toFixed(2)} TL</div>
            <div>{order.paymentMethod}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
