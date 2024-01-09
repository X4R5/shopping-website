import React, { useState, useEffect } from 'react';
import ColorfulLine from './ColorfulLine';
import NavbarCategories from './NavbarCategories';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] =   useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
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


  

  return (
    <div className="mb-3">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
<<<<<<< Updated upstream
          <a className="navbar-brand logo-text" href="#">hepsiburada</a>
=======
          <Link href="/" className="navbar-brand">
            hepsiburada
          </Link>
>>>>>>> Stashed changes
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <div className="input-group mt-2">
                  <input type="text" className="form-control" placeholder="Ürünlerde ara" />
                  <button className="btn btn-secondary" type="submit">Ara</button>
                </div>
              </li>
            </ul>
            <div className="ml-auto">
            {isLoggedIn ? (
              <>
                  
                    <button type="button" className="btn btn-secondary py-2 py-lg-3 mx-1" onClick={handleCartRedirect}>Sepet</button>
                 

                 
                    <button type="button" className="btn btn-secondary py-2 py-lg-3 mx-1" onClick={handleProfileRedirect}>Profilim</button>
                  
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