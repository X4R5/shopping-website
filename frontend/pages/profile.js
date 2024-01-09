import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import OrderCard from '../components/OrderCard';

function ProfilePage() {
    const [userInfo, setUserInfo] = useState({    
      });

      const [orders, setOrders] = useState([]);
    
    
      const [activeTab, setActiveTab] = useState('info');

      useEffect(() => {
        const token = localStorage.getItem('token');
    
        const fetchUserInfo = async () => {
          try {
            const response = await fetch('http://localhost:3001/api/users/user', {
              headers: {
                'Authorization': `Bearer ${token}`
              },
            });
            if (!response.ok) throw new Error('Kullanıcı bilgileri çekilemedi.');
            const data = await response.json();
            setUserInfo(data[0]);
            console.log(data[0])
          } catch (error) {
            console.error('Kullanıcı bilgileri çekilirken hata oluştu:', error);
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
            return product;
          } catch (error) {
            console.error('Ürün çekilirken hata oluştu:', error);
          }
        };
      
        const fetchOrders = async () => {
          try {
            const response = await fetch('http://localhost:3001/api/orders/user', {
              headers: {
                'Authorization': `Bearer ${token}`
              },
            });
            if (!response.ok) throw new Error('Siparişler çekilemedi.');
            const orderData = await response.json();
      
            const ordersWithProducts = await Promise.all(orderData.map(async order => {
              
              const productIds = order.productIds.split(',');
              const quantities = order.quantities.split(',');
      
              const products = await Promise.all(productIds.map(async (productId, index) => {
                const product = await fetchProductDetails(productId);
                return {
                  ...product,
                  quantity: quantities[index]
                };
              }));
      
              return {
                ...order,
                products,
                totalPrice: products.reduce((acc, product) => acc + product[0].product_price * product.quantity, 0)
              };
            }));
      
            setOrders(ordersWithProducts);
          } catch (error) {
            console.error('Siparişler çekilirken hata oluştu:', error);
          }
        };
      
        fetchUserInfo();
        fetchOrders();
      
      }, []);

      const handleSubmit = async (e) => {
        e.preventDefault();
      
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        if(password !== confirmPassword) {
          alert("Şifreler uyuşmuyor!");
          return;
        }
      
        const token = localStorage.getItem('token');
        const updatedUserInfo = {
          name: userInfo.name,
          email: userInfo.email,
          password: password,
        };
      
        try {
          const response = await fetch('http://localhost:3001/api/user', {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUserInfo),
          });
      
          if (!response.ok) throw new Error('Profil güncellenemedi.');
      
          const data = await response.json();
          setUserInfo(data);
          alert("Profil başarıyla güncellendi!");
        } catch (error) {
          console.error('Profil güncellenirken hata oluştu:', error);
          alert("Profil güncellenirken bir hata oluştu.");
        }
      };
      
    
    
      const renderInitials = (name) => {
        let initials = name.split(' ').map((n) => n[0]).join('');
        return (
          <div className="initials-placeholder" style={{ background: 'blue', color: 'white', borderRadius: '50%', textAlign: 'center', lineHeight: '40px', height: '40px', width: '40px' }}>
            {initials}
          </div>
        );
      };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
      <div className="row">
            <div className="col-md-3">
            <div className='d-flex justify-content-center align-items-center'>{renderInitials(userInfo.name)}</div>
            <div className="d-flex justify-content-center align-items-center mt-3">{userInfo.name}</div>

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
