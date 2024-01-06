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

      const [orders, setOrders] = useState([]);
    
    
      const [activeTab, setActiveTab] = useState('info');

      useEffect(() => {
        const token = localStorage.getItem('token'); // Token'ı localStorage'dan alın
    
        const fetchUserInfo = async () => {
          // Kullanıcı bilgilerini çekmek için API isteği
          try {
            const response = await fetch('http://localhost:3001/api/user', {
              headers: {
                'Authorization': `Bearer ${token}`
              },
            });
            if (!response.ok) throw new Error('Kullanıcı bilgileri çekilemedi.');
            const data = await response.json();
            setUserInfo(data);
          } catch (error) {
            console.error('Kullanıcı bilgileri çekilirken hata oluştu:', error);
          }
        };
    
        const fetchOrders = async () => {
          // Siparişleri çekmek için API isteği
          try {
            const response = await fetch('http://localhost:3001/api/orders', {
              headers: {
                'Authorization': `Bearer ${token}`
              },
            });
            if (!response.ok) throw new Error('Siparişler çekilemedi.');
            const data = await response.json();
            setOrders(data);
          } catch (error) {
            console.error('Siparişler çekilirken hata oluştu:', error);
          }
        };
    
        fetchUserInfo();
        fetchOrders();
      }, []);

      const handleSubmit = async (e) => {
        e.preventDefault(); // Formun varsayılan gönderme davranışını engelle
      
        // Şifrelerin uyuşup uyuşmadığını kontrol et
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        if(password !== confirmPassword) {
          alert("Şifreler uyuşmuyor!");
          return;
        }
      
        const token = localStorage.getItem('token'); // Token'ı localStorage'dan alın
        const updatedUserInfo = {
          name: userInfo.name,
          email: userInfo.email,
          password: password, // Yeni şifre (eğer girildiyse)
        };
      
        try {
          const response = await fetch('http://localhost:3001/api/user', {
            method: 'PUT', // veya 'POST', API'nizin gerektirdiği yöntem
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUserInfo),
          });
      
          if (!response.ok) throw new Error('Profil güncellenemedi.');
      
          const data = await response.json();
          setUserInfo(data); // Kullanıcı bilgilerini güncelle
          alert("Profil başarıyla güncellendi!"); // Başarılı güncelleme mesajı
        } catch (error) {
          console.error('Profil güncellenirken hata oluştu:', error);
          alert("Profil güncellenirken bir hata oluştu."); // Hata mesajı
        }
      };
      
    
    
      const getInitials = (firstName, lastName) => {
        return `${firstName[0]}${lastName[0]}`;
      };
    
      const renderProfilePicture = () => {
        return (
          <div className="profile-picture bg-primary rounded-circle text-white d-flex justify-content-center align-items-center" style={{ width: '80px', height: '80px', fontSize: '2em' }}>
            {getInitials(userInfo.name)}
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
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">İsim:</label>
                    <input type="text" className="form-control" id="firstName" value={userInfo.name} onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} />
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
                {orders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
            </div>
        )}
        </div>
      </div>
    </div>
    </div>
  );
}

export default ProfilePage;
