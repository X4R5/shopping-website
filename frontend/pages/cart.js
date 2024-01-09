import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CartItem from '../components/CartItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { useRouter } from 'next/router';


function CartPage() {
  const router = useRouter();
  const [basketItems, setBasketItems] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);


  const total = basketItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 29.90;
  const grandTotal = total + shipping;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Lütfen giriş yapınız.');
      router.push('/login');
      return;
    }

    
  
    const fetchBasketItems = async () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      console.log('Sepet bilgisi:', cart);
    
      try {
        const updatedBasketItems = [];
        
        for (const cartItem of cart) {
          const product = await fetchProductDetails(parseInt(cartItem.productId));
          console.log("f", cartItem);
          
          updatedBasketItems.push({
            ...product[0],
            quantity: cartItem.quantity,
            price: cartItem.price,
          });
        }
    
        setBasketItems(updatedBasketItems);
        console.log("a", basketItems);
        
      } catch (error) {
        console.error('Sepet bilgisi çekilirken hata oluştu:', error);
      }
    };


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
        console.log("c", product);
        console.log("d", id);
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
          price: cart[index].price,
        }));

        setBasketItems(updatedBasketItems);
        
      } catch (error) {
        console.error('Sepet bilgisi çekilirken hata oluştu:', error);
      }
    };

  
    fetchBasketItems();
    console.log("e", basketItems.length);
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
  
  

  const handleCouponChange = (e) => {
    setCoupon(e.target.value);
  };

  const applyCoupon = async () => {
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
      setIsDiscountApplied(true);
      setDiscountAmount(data[0].discount);

      const newBasketItems = basketItems.map(item => {
        return { ...item, price: item.price - (item.price * discountAmount / 100) };
      });

      setBasketItems(newBasketItems);
      localStorage.setItem('cart', JSON.stringify(newBasketItems));

      alert("Kupon başarıyla uygulandı!");
  
    } catch (error) {
      console.error('Kupon uygulanırken hata oluştu:', error);
      alert(error.message);
    }
  };
  
  const handleRedirectCompleteOrder = () => {
    router.push('/completeorder');
  }


  const finalTotal = isDiscountApplied ? grandTotal - (grandTotal * discountAmount / 100) : grandTotal;


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

          
            <button onClick={handleRedirectCompleteOrder} className="btn btn-orange">Satın Al</button>

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