import React, { useState, useEffect } from 'react';
import ColorfulLine from './ColorfulLine';
import NavbarCategories from './NavbarCategories';
import Link from 'next/link';


function Navbar() {
  const [isLoggedIn, setIsLoggedIn] =   useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const admin = localStorage.getItem('isAdmin');
    setIsAdmin(!!admin);
    setIsLoggedIn(!!token);
  }, []);


  const handleLoginRedirect = () => {
    window.location.href = '/login';
  }

  const handleProfileRedirect = () => {
    window.location.href = '/profile';
  }

  const handleCartRedirect = () => {
    window.location.href = '/cart';
  }

  const handleAdminPanelRedirect = () => {
    window.location.href = '/admin';
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    window.location.href = '/';
  }

  const handleContactRedirect = () => {
    window.location.href = '/contact';
  }


  

  return (
    <div className="mb-3">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">

          <Link href="/" className="navbar-brand">
            hepsiburada
          </Link>



          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mynavbar">
            <div className="ml-auto">
            {isLoggedIn ? (
              <>
              
              {isAdmin && (
                <button type="button" className="btn btn-secondary py-2 py-lg-3 mx-1" onClick={handleAdminPanelRedirect}>Admin Panel</button>
              )}


                  <button type="button" className="btn btn-secondary py-2 py-lg-3 mx-1" onClick={handleContactRedirect}>İletişim</button>

                  <button type="button" className="btn btn-secondary py-2 py-lg-3 mx-1" onClick={handleCartRedirect}>Sepet</button>

                  <button type="button" className="btn btn-secondary py-2 py-lg-3 mx-1" onClick={handleProfileRedirect}>Profilim</button>

                  <button type="button" className="btn btn-secondary py-2 py-lg-3 mx-1" onClick={handleLogout}>Çıkış Yap</button>
                  
              </>
              ) : (
                  <button type="button" className="btn btn-secondary py-2 py-lg-3" onClick={handleLoginRedirect}>Giriş Yap</button>
              )}

            </div>
          </div>
        </div>
      </nav>

      <ColorfulLine />

      <NavbarCategories />

    </div>
  );
}

export default Navbar;