import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function OrderCompletionPage() {
  const [basketItems, setBasketItems] = useState([]);

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

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

  const handlePurchase = async () => {
    const token = localStorage.getItem('token');
  
    const orderDetails = {
      ProductList: basketItems,
      address: city+' '+district+' '+address,
      deliveryOption,
      paymentMethod,
    };
  
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
      // delete cart from local storage
      localStorage.removeItem('cart');

      const result = await response.json();
      console.log('Sipariş başarıyla oluşturuldu:', result);
      alert("Sipariş başarıyla tamamlandı!");
    } catch (error) {
      console.error('Sipariş oluşturma sırasında hata oluştu:', error);
      alert("Sipariş oluşturma sırasında bir hata oluştu.");
    }
  };
  

  const additionalProducts = basketItems.length > 2 ? basketItems.length - 2 : 0;
  const totalPrice = basketItems.reduce((total, item) => total + item[0].product_price * item.quantity, 0);

  return (
    <div>
      <Navbar />
    <div className="container mt-4">
      <div className="d-flex align-items-center mb-5">

        {basketItems.slice(0, 2).map((item, index) => (
          <img key={item[0].product_id} src={item[0].product_image} alt={item[0].product_name} className="rounded-circle"
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
                 zIndex: basketItems.length + 1,
                 border: '2px solid white'
               }}>
            +{additionalProducts}
          </div>
        )}
        <span className="mx-5 me-3">Toplam: {totalPrice.toFixed(2)} TL</span>
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
              <input type="radio" id="pickupStore" name="deliveryOption" value="Mağazadan Teslim" className="form-check-input"
                     checked={deliveryOption === 'Mağazadan Teslim'} onChange={(e) => setDeliveryOption(e.target.value)} />
              <label className="form-check-label" htmlFor="pickupStore">Mağazadan Teslim</label>
            </div>
          </div>

          <h3>Ödeme Yöntemi</h3>
          <div className="mb-3">
            <div className="form-check">
              <input type="radio" id="paymentOnline" name="paymentMethod" value="Online Kredi Kartı" className="form-check-input"
                     checked={paymentMethod === 'Online Kredi Kartı'} onChange={(e) => setPaymentMethod(e.target.value)} />
              <label className="form-check-label" htmlFor="paymentOnline">Online Kredi Kartı</label>
            </div>
            <div className="form-check">
              <input type="radio" id="paymentOnDelivery" name="paymentMethod" value="Kapıda Ödeme" className="form-check-input"
                     checked={paymentMethod === 'Kapıda Ödeme'} onChange={(e) => setPaymentMethod(e.target.value)} />
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