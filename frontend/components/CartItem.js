import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const itemTotalPrice = item.price * item.quantity;

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex flex-row align-items-center justify-content-start">
          <div className="me-3">
            <img src={item.image} alt={item.name} className="img-fluid" style={{width: '100px'}} />
          </div>
          <div className="flex-grow-1 me-3" style={{minWidth: 0}}>
            <h5 className="card-title" style={{
                maxWidth: '500px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
            }}>{item.name}</h5>
          </div>
          <div className="ms-auto d-flex align-items-center">
            {
              item.quantity > 1 ? (
                <button className="btn btn-outline-secondary" onClick={() => onDecrease(item.id)}>
                  <FontAwesomeIcon icon={faMinus} />
                </button>
              ) : (
                <button className="btn btn-outline-danger" onClick={() => onRemove(item.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              )
            }
            <span className="mx-2">{item.quantity}</span>
            <button className="btn btn-outline-secondary" onClick={() => onIncrease(item.id)}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <div className="ms-3" style={{width: '100px', textAlign: 'right'}}>
            <span className="price">{itemTotalPrice.toFixed(2)} TL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
