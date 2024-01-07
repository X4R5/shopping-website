import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import CartItem from '../components/CartItem';
import 'bootstrap/dist/css/bootstrap.min.css';

function CartPage() {
  const [basketItems, setBasketItems] = useState([]);

  const total = basketItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
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
        return product;
      } catch (error) {
        console.error('Ürün çekilirken hata oluştu:', error);
      }
    };

    const fetchBasketItems = async () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const updatedBasketItems = [];

      for (const cartItem of cart) {
        const product = await fetchProductDetails(cartItem.productId);
        if (product) {
          updatedBasketItems.push({
            ...product,
            quantity: cartItem.quantity,
          });
        }
      }

      setBasketItems(updatedBasketItems);
    };

    fetchBasketItems();
  }, []);



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
              {basketItems.map(item => (
                <CartItem 
                  key={item.id} 
                  item={item} 
                  onIncrease={handleIncrease} 
                  onDecrease={handleDecrease} 
                  onRemove={handleRemove}
                />
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
            <button className="btn btn-orange btn-lg">Sepeti Onayla</button>
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