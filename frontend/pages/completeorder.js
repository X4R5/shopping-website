import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function OrderCompletionPage() {
  const [basketItems] = useState([
    {
      id: 1,
      name: 'iPhone 13 128 GB - Black',
      price: 1.00,
      image: 'https://parcs.org.au/wp-content/uploads/2016/03/placeholder-image-red-1.png',
      seller: 'Hepsiburada',
      quantity: 1
    },
    {
      id: 2,
      name: 'Bosch Professional Screwdriver Bit Set 44+1 Piece - 2607017692',
      price: 1.00,
      image: 'https://parcs.org.au/wp-content/uploads/2016/03/placeholder-image-red-1.png',
      seller: 'Hepsiburada',
      quantity: 1
    },
    {
      id: 3,
      name: 'Bosch Professional Screwdriver Bit Set 44+1 Piece - 2607017692',
      price: 1.00,
      image: 'https://parcs.org.au/wp-content/uploads/2016/03/placeholder-image-red-1.png',
      seller: 'Hepsiburada',
      quantity: 1
    },
    {
      id: 4,
      name: 'Bosch Professional Screwdriver Bit Set 44+1 Piece - 2607017692',
      price: 1.00,
      image: 'https://parcs.org.au/wp-content/uploads/2016/03/placeholder-image-red-1.png',
      seller: 'Hepsiburada',
      quantity: 1
    }
  ]);

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');


  const handlePurchase = () => {
    console.log('Purchase made with address:', address, 'and payment method:', paymentMethod);
  };

  const additionalProducts = basketItems.length > 2 ? basketItems.length - 2 : 0;
  const totalPrice = basketItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <Navbar />
    <div className="container mt-4">
      <div className="d-flex align-items-center mb-5">

        {basketItems.slice(0, 2).map((item, index) => (
          <img key={item.id} src={item.image} alt={item.name} className="rounded-circle"
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

      <form onSubmit={handlePurchase} className="row g-5">

        <div className="col-md-6">
          <h3>Teslimat adresi</h3>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">İl</label>
            <select id="city" className="form-select" value={city} onChange={(e) => setCity(e.target.value)}>

            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="district" className="form-label">İlçe</label>
            <select id="district" className="form-select" value={district} onChange={(e) => setDistrict(e.target.value)}>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Adres</label>
            <textarea id="address" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
        </div>

        <div className="col-md-6">
          <h3>Teslimat Seçenekleri</h3>
          <div className="mb-3">
            <div className="form-check">
              <input type="radio" id="deliveryDoor" name="deliveryOption" value="Door" className="form-check-input"
                     checked={deliveryOption === 'Door'} onChange={(e) => setDeliveryOption(e.target.value)} />
              <label className="form-check-label" htmlFor="deliveryDoor">Adrese Teslim</label>
            </div>
            <div className="form-check">
              <input type="radio" id="pickupStore" name="deliveryOption" value="Store" className="form-check-input"
                     checked={deliveryOption === 'Store'} onChange={(e) => setDeliveryOption(e.target.value)} />
              <label className="form-check-label" htmlFor="pickupStore">Mağazadan Teslim</label>
            </div>
          </div>

          <h3>Ödeme Yöntemi</h3>
          <div className="mb-3">
            <div className="form-check">
              <input type="radio" id="paymentOnline" name="paymentMethod" value="Online" className="form-check-input"
                     checked={paymentMethod === 'Online'} onChange={(e) => setPaymentMethod(e.target.value)} />
              <label className="form-check-label" htmlFor="paymentOnline">Online Kredi Kartı</label>
            </div>
            <div className="form-check">
              <input type="radio" id="paymentOnDelivery" name="paymentMethod" value="OnDelivery" className="form-check-input"
                     checked={paymentMethod === 'OnDelivery'} onChange={(e) => setPaymentMethod(e.target.value)} />
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