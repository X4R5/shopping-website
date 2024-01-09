import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function OrderCard({ initialOrder }) {
  const [userName, setUserName] = useState('');
  const [order, setOrder] = useState(initialOrder);

  useEffect(() => {
    const fetchUserName = async () => {
      try {

        const response = await fetch(`http://localhost:3001/api/users/${initialOrder.userId}`, {

          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('User information could not be retrieved.');
        const userData = await response.json();

        setUserName(userData[0].name);

      } catch (error) {
        console.error('Error occurred while fetching user information:', error);
      }
    };

    fetchUserName();
  }, [initialOrder.userId]);

  const handleCompleteOrder = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/orders/updateStatus/${order.id}`, {

        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Order could not be updated.');

      fetchOrder();
    } catch (error) {
      console.error('Error occurred while updating the order:', error);
    }
  };

  const fetchOrder = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/orders/${order.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Order information could not be retrieved.');
      const orderData = await response.json();
      setOrder(orderData);
    } catch (error) {
      console.error('Error occurred while fetching order information:', error);
    }
  };

  return (
    <div className="card mb-3" style={{ overflow: 'hidden' }}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="card-title">Order ID: {order.id}</h5>
            <p>User Name: {userName}</p>
            <p>Order Status: <FontAwesomeIcon icon={faCheckCircle} className="text-success" /> {order.status}</p>

            {order.status === 'Hazirlaniyor' && (

              <button className="btn btn-primary" onClick={handleCompleteOrder}>Complete Order</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
