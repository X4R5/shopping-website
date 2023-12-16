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
                <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Elektronik
                </a>
              </li>

              <li class="nav-item list-group-item">
                <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Giyim
                </a>
              </li>
              
              <li class="nav-item list-group-item">
                <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Kitap
                </a>
              </li>

              <li class="nav-item list-group-item">
                <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Ofis
                </a>
              </li>

              <li class="nav-item list-group-item">
                <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Oyuncak
                </a>
              </li>

              <li class="nav-item list-group-item">
                <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Kişisel Bakım
                </a>
              </li>

              <li class="nav-item list-group-item">
                <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Spor
                </a>
              </li>

              <li class="nav-item list-group-item">
                <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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
