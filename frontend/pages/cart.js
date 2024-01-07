import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CartItem from '../components/CartItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';

function CartPage() {
  const [basketItems, setBasketItems] = useState([]);

  const total = basketItems.reduce((acc, item) => acc + item[0].product_price * item.quantity, 0);
  const shipping = total > 50000 ? 0 : 29.90;
  const grandTotal = total + shipping;

  useEffect(() => {
    const fetchProductDetails = async (id) => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:3001/api/products/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Ürün bilgisi çekilemedi.');
        const product = await response.json();
        console.log(product);
        return product;
      } catch (error) {
        console.error('Ürün çekilirken hata oluştu:', error);
      }
    };
  
    const fetchBasketItems = async () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      console.log('Sepet bilgisi:', cart);
      
      try {
        const promises = cart.map(async item => fetchProductDetails(item.productId));
        const products = await Promise.all(promises);
  
        const updatedBasketItems = products.map((item, index) => ({
          ...item,
          quantity: cart[index].quantity,
        }));

        setBasketItems(updatedBasketItems);
        
      } catch (error) {
        console.error('Sepet bilgisi çekilirken hata oluştu:', error);
      }
    };
  
    fetchBasketItems();
  }, []);

  useEffect(() => {
    console.log(basketItems);
  });
  



  const handleIncrease = (id) => {
    const newBasketItems = basketItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setBasketItems(newBasketItems);
    localStorage.setItem('cart', JSON.stringify(newBasketItems));
  };

  const handleDecrease = (id) => {
    const newBasketItems = basketItems.map(item => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setBasketItems(newBasketItems);
    localStorage.setItem('cart', JSON.stringify(newBasketItems));
  };
  

  const handleRemove = (id) => {
    const newBasketItems = basketItems.filter(item => item.id !== id);
    setBasketItems(newBasketItems);
    localStorage.setItem('cart', JSON.stringify(newBasketItems));
  };
  

  const clearCart = () => {
    setBasketItems([]);
    localStorage.removeItem('cart');
  };
  
  

  return (
    <div>
      <Navbar />
      <div className="container mt-3">
        <div className="my-2 d-flex justify-content-between align-items-center">
          <h2>Sepetim ({basketItems.length} ürün)</h2>
            <button className="btn btn-outline-danger" onClick={clearCart}>Sepeti Boşalt</button>
        </div>
        {
          basketItems.length > 0 ? (
            <>
              {basketItems.map((item, index) => (
                <div key={index}>
                <CartItem 
                  item={item[0]} 
                  quantity={item.quantity}
                  onIncrease={handleIncrease} 
                  onDecrease={handleDecrease} 
                  onRemove={handleRemove}
                />
                </div>
              ))}
            <div className="card">
              <div className="card-body">
                <div className="row justify-content-end">
                  <div className="col-auto">
                    <div className="d-flex justify-content-between">
                      <span className='mx-5'>Ürünler:</span>
                      <span>{total.toFixed(2)} TL</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className='mx-5'>Kargo:</span>
                      <span>{shipping.toFixed(2)} TL</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className='mx-5'>Toplam:</span>
                      <span>{grandTotal.toFixed(2)} TL</span>
                    </div>
                  </div>
                </div>
              </div>
          <div className="card-footer d-flex justify-content-end">
          <Link href="/completeorder">
            <button className="btn btn-orange">Satın Al</button>
          </Link>

          </div>
        </div>
            </>
          ) : (
            <div className="text-center mt-5">
              <h3>Sepetinizde ürün yok.</h3>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default CartPage;