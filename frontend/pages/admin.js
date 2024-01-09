import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminPage() {
  const [activeTab, setActiveTab] = useState('createProduct');
  // State for create product form
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState('');

  // State for orders
  const [orders, setOrders] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      router.push('/');
    } else {
      // Fetch orders when admin logs in
      fetchOrders();
    }
  }, [router]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/orders', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Siparişler çekilemedi.');
      const fetchedOrders = await response.json();
      setOrders(fetchedOrders);
    } catch (error) {
      console.error('Siparişler çekilirken hata oluştu:', error);
    }
  };
  

  const handleCreateProductSubmit = (e) => {
    e.preventDefault();
    // Submit create product form logic here
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3">
            <ul className="nav flex-column mt-3">
              <li className="nav-item">
                <a className={`nav-link ${activeTab === 'createProduct' && 'active'}`} onClick={() => setActiveTab('createProduct')}>
                  Ürün Oluştur
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${activeTab === 'viewOrders' && 'active'}`} onClick={() => setActiveTab('viewOrders')}>
                  Siparişleri Görüntüle
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-9">
            {activeTab === 'createProduct' && (
              <div>
                <h3>Ürün Oluştur</h3>
                <form onSubmit={handleCreateProductSubmit}>
                  <div className="mb-3">
                    <label htmlFor="productName">Ürün Adı</label>
                    <input type="text" className="form-control" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="productPrice">Fiyatı</label>
                    <input type="number" className="form-control" id="productPrice" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="productCategory">Kategorisi</label>
                    <select className="form-control" id="productCategory" value={productCategory} onChange={(e) => setProductCategory(e.target.value)}>
                      {/* Populate options here */}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="productDescription">Açıklaması</label>
                    <textarea className="form-control" id="productDescription" rows="3" value={productDescription} onChange={(e) => setProductDescription(e.target.value)}></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="productImage">Resim URL</label>
                    <input type="text" className="form-control" id="productImage" value={productImage} onChange={(e) => setProductImage(e.target.value)} />
                  </div>
                  <button type="submit" className="btn btn-primary">Ürün Ekle</button>
                </form>
              </div>
            )}

            {activeTab === 'viewOrders' && (
            <div>
                <h3>Siparişler</h3>
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

export default AdminPage;
