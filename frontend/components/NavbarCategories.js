import React from 'react';

function NavbarCategories() {
  return (
    <div class="bg-light w-100" style={{ height: '75px' }}>
      <nav class="navbar navbar-expand-sm border-body d-flex flex-row align-items-center">
        <div class="container-fluid d-flex justify-content-center align-items-center">
          <button class="navbar-toggler border-0 mt-2 py-2" type="button" data-bs-toggle="collapse" data-bs-target="#categories">
            Kategoriler
          </button>
          <div class="collapse navbar-collapse mx-5" id="categories">
            <ul class="navbar-nav horizontal-list d-flex justify-content-center">

              <li class="nav-item list-group-item">
                <a class="nav-link" href="#" role="button" >
                  Elektronik
                </a>
              </li>

              <li class="nav-item list-group-item">
                <a class="nav-link" href="#" role="button" >
                  Giyim
                </a>
              </li>
              
              <li class="nav-item list-group-item">
                <a class="nav-link" href="#" role="button" >
                  Kitap
                </a>
              </li>

              <li class="nav-item list-group-item">
                <a class="nav-link" href="#" role="button" >
                  Ofis
                </a>
              </li>

              <li class="nav-item list-group-item">
                <a class="nav-link" href="#" role="button" >
                  Oyuncak
                </a>
              </li>

              <li class="nav-item list-group-item">
                <a class="nav-link" href="#" role="button" >
                  Kişisel Bakım
                </a>
              </li>

              <li class="nav-item list-group-item">
                <a class="nav-link" href="#" role="button" >
                  Spor
                </a>
              </li>

              <li class="nav-item list-group-item">
                <a class="nav-link" href="#" role="button" >
                  Supermarket
                </a>
              </li>

              
            </ul>
          </div>
          
        </div>
      </nav>
    </div>
  );
}

export default NavbarCategories;
