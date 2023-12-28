import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import OrderCard from '../components/OrderCard';

function ProfilePage() {
    const [userInfo, setUserInfo] = useState({
        firstName: 'Hüseyin Uğur',
        lastName: 'Aydın',
        email: 'huseyin.ugur@example.com',
        password: '',    
      });

      const order = {
        id: '116643015',
        date: '15 Kasım Çar, 15:32',
        status: 'Sipariş Tamamlandı',
        paymentMethod: 'Kredi Kartı',
        totalPrice: 2.00,
        products: [
          {
            id: 1,
            name: 'iPhone 13 128 GB - Black',
            price: 1.00,
            image: 'https://parcs.org.au/wp-content/uploads/2016/03/placeholder-image-red-1.png',
          },
          {
            id: 2,
            name: 'Bosch Professional Screwdriver Bit Set 44+1 Piece - 2607017692',
            price: 1.00,
            image: 'https://parcs.org.au/wp-content/uploads/2016/03/placeholder-image-red-1.png',
          },
          {
            id: 3,
            name: 'Bosch Professional Screwdriver Bit Set 44+1 Piece - 2607017692',
            price: 1.00,
            image: 'https://parcs.org.au/wp-content/uploads/2016/03/placeholder-image-red-1.png',
          }
        ]
      };
    
    
      const [activeTab, setActiveTab] = useState('info');
    
      const getInitials = (firstName, lastName) => {
        return `${firstName[0]}${lastName[0]}`;
      };
    
      const renderProfilePicture = () => {
        return (
          <div className="profile-picture bg-primary rounded-circle text-white d-flex justify-content-center align-items-center" style={{ width: '80px', height: '80px', fontSize: '2em' }}>
            {getInitials(userInfo.firstName, userInfo.lastName)}
          </div>
        );
      };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
      <div className="row">
            <div className="col-md-3">
            <div className='d-flex justify-content-center align-items-center'>{renderProfilePicture()}</div>
            <div className="d-flex justify-content-center align-items-center mt-3">{userInfo.firstName} {userInfo.lastName}</div>

            <div className="d-flex justify-content-center align-items-center mt-3">
            <ul className="nav flex-column mt-3">
                <li className="nav-item">
                <a href="#userInfo" className={`nav-link ${activeTab === 'info' && 'active'}`} onClick={() => setActiveTab('info')}>
                    Profil Bilgilerim
                </a>
                </li>
                <li className="nav-item">
                <a href="#orders" className={`nav-link ${activeTab === 'orders' && 'active'}`} onClick={() => setActiveTab('orders')}>
                    Sipariş Geçmişi
                </a>
                </li>
            </ul>
            </div>
            </div>
        <div className="col-md-9">
          {activeTab === 'info' && (
            <div className="user-info">
                <h3 className='mb-4'>Profil Bilgilerim</h3>
                <form>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">İsim:</label>
                    <input type="text" className="form-control" id="firstName" value={userInfo.firstName} onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Soyisim:</label>
                    <input type="text" className="form-control" id="lastName" value={userInfo.lastName} onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" value={userInfo.email} onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Yeni Şifre (Değiştirmek istemiyorsanız boş bırakabilirsiniz):</label>
                    <input type="password" className="form-control" id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Yeni Şifreyi Onayla:</label>
                    <input type="password" className="form-control" id="confirmPassword" />
                </div>
                <button type="submit" className="btn btn-orange">Profili Güncelle</button>
                </form>
            </div>          
          )}

        {activeTab === 'orders' && (
            <div className="user-orders">
                <h3 className='mb-4'>Sipariş Geçmişim</h3>
                <OrderCard order={order} />
            </div>
        )}
        </div>
      </div>
    </div>
    </div>
  );
}

export default ProfilePage;
