import React from 'react';
import ColorfulLine from './ColorfulLine';
import NavbarCategories from './NavbarCategories';

function Navbar() {
  return (
    <div className="mb-3">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand logo-text" href="#">hepsiburada</a>
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
              <button type="button" className="btn btn-secondary py-2 py-lg-3">Giriş Yap</button>
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
