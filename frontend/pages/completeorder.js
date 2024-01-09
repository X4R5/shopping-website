import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';

function OrderCompletionPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const[grandTotal, setGrandTotal] = useState(0);

  const [products, setProducts] = useState([]);

  const additionalProducts = cartItems.length > 2 ? cartItems.length - 2 : 0;
  const shipping = 29.90;

  
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Lütfen giriş yapınız.');
      router.push('/login');
      return;
    }
  
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  
    const newTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setGrandTotal(newTotal + shipping);
  }, []);
  
  useEffect(() => {
    const fproducts = cartItems.map(item => {
      const productData = JSON.parse(localStorage.getItem('product' + item.product_id));
      console.log(productData);
      return {
        product_id: item.product_id,
        product_name: productData ? productData.product_name : 'Ürün adı bulunamadı',
        product_image: productData ? productData.product_image : 'Varsayılan resim yolu',
        quantity: item.quantity
      };
    });
  
    setProducts(fproducts);
  }, [cartItems]);
  

  const handlePurchase = async () => {
    const token = localStorage.getItem('token');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    
    
    const orderDetails = {
      ProductList: cart,
      address: city+' '+district+' '+address,
      deliveryOption,
      paymentMethod,
    };

    console.log(orderDetails);
  
    try {
      const response = await fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });
  
      if (!response.ok) throw new Error('Sipariş oluşturulamadı.');

      localStorage.removeItem('cart');

      const result = await response.json();
      console.log('Sipariş başarıyla oluşturuldu:', result);
      alert("Sipariş başarıyla tamamlandı!");
    } catch (error) {
      console.error('Sipariş oluşturma sırasında hata oluştu:', error);
      alert("Sipariş oluşturma sırasında bir hata oluştu.");
    }
  };
  

  

  return (
    <div>
      <Navbar />
    <div className="container mt-4">
      <div className="d-flex align-items-center mb-5">

        {cartItems.slice(0, 2).map((item, index) => (
          <img key={products.product_id} src={products.product_image} alt={products.product_name} className="rounded-circle"
               style={{
                 width: '60px', height: '60px', objectFit: 'cover',
                 position: 'relative',
                 zIndex: index + 1,
                 marginLeft: index === 0 ? '0' : '-30px',
                 border: '2px solid white'
               }} />
        ))}

        {additionalProducts > 0 && (
          <div className="rounded-circle bg-secondary d-flex justify-content-center align-items-center"
               style={{
                 width: '60px', height: '60px',
                 marginLeft: '-30px',
                 color: 'white',
                 zIndex: cartItems.length + 1,
                 border: '2px solid white'
               }}>
            +{additionalProducts}
          </div>
        )}
        <span className="mx-5 me-3">Toplam: {grandTotal.toFixed(2)} TL</span>
      </div>

      <form onSubmit={(e) => {
        e.preventDefault();
        handlePurchase();
      }} className="row g-5">

      <div className="col-md-6">
        <h3>Teslimat adresi</h3>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">İl</label>
          <input type="text" id="city" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="district" className="form-label">İlçe</label>
          <input type="text" id="district" className="form-control" value={district} onChange={(e) => setDistrict(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Adres Detayı</label>
          <textarea id="address" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
      </div>


        <div className="col-md-6">
          <h3>Teslimat Seçenekleri</h3>
          <div className="mb-3">
            <div className="form-check">
              <input type="radio" id="deliveryDoor" name="deliveryOption" value="Adrese Teslim" className="form-check-input"
                     checked={deliveryOption === 'Adrese Teslim'} onChange={(e) => setDeliveryOption(e.target.value)} />
              <label className="form-check-label" htmlFor="deliveryDoor">Adrese Teslim</label>
            </div>
            <div className="form-check">
              <input type="radio" id="pickupStore" name="deliveryOption" value="Magazadan Teslim" className="form-check-input"
                     checked={deliveryOption === 'Magazadan Teslim'} onChange={(e) => setDeliveryOption(e.target.value)} />
              <label className="form-check-label" htmlFor="pickupStore">Mağazadan Teslim</label>
            </div>
          </div>

          <h3>Ödeme Yöntemi</h3>
          <div className="mb-3">
            <div className="form-check">
              <input type="radio" id="paymentOnline" name="paymentMethod" value="Online Kredi Karti" className="form-check-input"
                     checked={paymentMethod === 'Online Kredi Karti'} onChange={(e) => setPaymentMethod(e.target.value)} />
              <label className="form-check-label" htmlFor="paymentOnline">Online Kredi Kartı</label>
            </div>
            <div className="form-check">
              <input type="radio" id="paymentOnDelivery" name="paymentMethod" value="Kapida Ödeme" className="form-check-input"
                     checked={paymentMethod === 'Kapida Ödeme'} onChange={(e) => setPaymentMethod(e.target.value)} />
              <label className="form-check-label" htmlFor="paymentOnDelivery">Kapıda Ödeme</label>
            </div>
          </div>

          <div className="mt-5 gap-2">
            <button type="submit" className="btn btn-orange py-3">Siparişi Tamamla</button>
          </div>
        </div>
      </form>


      </div>
    </div>
  );
}

export default OrderCompletionPage;