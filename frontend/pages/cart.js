import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CartItem from '../components/CartItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { useRouter } from 'next/router';


function CartPage() {
  const router = useRouter();
  const [coupon, setCoupon] = useState('');
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);


  const shipping = 29.90;

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
    const newTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(newTotal);
    setGrandTotal(newTotal + shipping);
    setFinalTotal(isDiscountApplied ? grandTotal - (grandTotal * discountAmount / 100) : grandTotal);
  }, []);

  useEffect(() => {
    const newTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(newTotal);
    setGrandTotal(newTotal + shipping);
    setFinalTotal(isDiscountApplied ? grandTotal - (grandTotal * discountAmount / 100) : grandTotal)
  }, [cartItems]);

  useEffect(() => {
    const newTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(newTotal);
    setGrandTotal(newTotal + shipping);
    setFinalTotal(isDiscountApplied ? grandTotal - (grandTotal * discountAmount / 100) : grandTotal)
  }, [isDiscountApplied]);

  
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Lütfen giriş yapınız.');
      router.push('/login');
      return;
    }
  }, []);


  const handleIncrease = (id) => {
    const newBasketItems = cartItems.map(item => {
      if (item.product_id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(newBasketItems);
    localStorage.setItem('cart', JSON.stringify(newBasketItems));
  };

  const handleDecrease = (id) => {
    const newBasketItems = cartItems.map(item => {
      if (item.product_id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(newBasketItems);
    localStorage.setItem('cart', JSON.stringify(newBasketItems));
  };
  

  const handleRemove = (id) => {
    const newBasketItems = cartItems.filter(item => item.product_id !== id);
    setCartItems(newBasketItems);
    localStorage.setItem('cart', JSON.stringify(newBasketItems));
  };
  

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };
  
  

  const handleCouponChange = (e) => {
    setCoupon(e.target.value);
  };

  const applyDiscountToCartItems = (items, discount) => {
    return items.map(item => {
      return { ...item, price: item.price - (item.price * discount / 100) };
    });
  };

  const applyCoupon = async () => {
    const isDiscountApplied = localStorage.getItem('isDiscountApplied') === 'true';
    if (isDiscountApplied) {
      alert('Zaten bir kupon uygulandı.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3001/api/orders/coupon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ couponCode: coupon }),
      });
  
      if (!response.ok){
        alert(error.message);
        throw new Error('Kupon uygulanamadı.');
      }
  
      const data = await response.json();
      localStorage.setItem('isDiscountApplied', true);
      setDiscountAmount(data[0].discount);

      setCartItems(prevItems => {
        const newItems = applyDiscountToCartItems(prevItems, data[0].discount);
        localStorage.setItem('cart', JSON.stringify(newItems));
        return newItems;
      });

      const newTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotal(newTotal);
      const newGrandTotal = total + shipping;
      setGrandTotal(newGrandTotal);
      const newFinalTotal = grandTotal - (grandTotal * discountAmount / 100);
      setFinalTotal(newFinalTotal);

      alert("Kupon başarıyla uygulandı!");
      setIsDiscountApplied(true);
  
    } catch (error) {
      console.error('Kupon uygulanırken hata oluştu:', error);
      alert(error.message);
    }
  };

  const handleCompleteOrderRedirect = () => {
    router.push('/completeorder');
  };


  return (
    <div>
      <Navbar />
      <div className="container mt-3">
        <div className="my-2 d-flex justify-content-between align-items-center">
          <h2>Sepetim ({cartItems.length} ürün)</h2>
            <button className="btn btn-outline-danger" onClick={clearCart}>Sepeti Boşalt</button>
        </div>
        {
          cartItems.length > 0 ? (
            <>
              {cartItems.map((item, index) => (
                <div key={index}>
                <CartItem 
                  item={JSON.parse(localStorage.getItem('product' + item.product_id))} 
                  quantity={item.quantity}
                  price={item.price}
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
                    {
                      isDiscountApplied ? (
                        <>
                          <div className="d-flex justify-content-end">
                            <div className="mx-5">Uygulanan İndirim:</div>
                            <div>{grandTotal * discountAmount.toFixed(2) / 100} TL</div>
                          </div>
                          <div className="d-flex justify-content-end">
                            <div className="mx-5">Toplam:</div>
                            <div>{finalTotal.toFixed(2)} TL</div>
                          </div>
                        </>
                      ) : (
                        <div className="d-flex justify-content-between">
                          <span className='mx-5'>Toplam:</span>
                          <span>{grandTotal.toFixed(2)} TL</span>
                        </div>
                      )
                    }

                    
                  </div>
                </div>
              </div>
          <div className="card-footer d-flex justify-content-end">
            <div className="my-3">
              <input type="text" value={coupon} onChange={handleCouponChange} placeholder="Kupon Kodu" className="form-control" />
              <button className="btn btn-success mt-2" onClick={applyCoupon}>Kupon Uygula</button>
            </div>
          
            <button className="btn btn-orange" onClick={handleCompleteOrderRedirect}>Satın Al</button>
          

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