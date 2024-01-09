import React from 'react';
import Link from 'next/link';

function NavbarCategories() {
  const categories = [
    { id: '1', name: 'Elektronik' },
    { id: '2', name: 'Giyim' },
    { id: '3', name: 'Ofis' },
    { id: '4', name: 'Kozmetik' },
    { id: '5', name: 'Supermarket' },
    { id: '6', name: 'Kitap' },
  ];

  return (
    <div className="bg-light w-100" style={{ height: '60px' }}>
      <nav className="navbar navbar-expand-sm border-body d-flex flex-row align-items-center">
        <div className="container-fluid d-flex justify-content-center align-items-center">
          <button className="navbar-toggler border-0 mt-2 py-2" type="button" data-bs-toggle="collapse" data-bs-target="#categories">
            Kategoriler
          </button>
          <div className="collapse navbar-collapse mx-5" id="categories">
            <ul className="navbar-nav horizontal-list d-flex justify-content-center align-items-center">
              {categories.map((category) => (
                <li className="nav-item list-group-item" key={category.id}>
                  <Link
                    className="nav-link"
                    href={`/category/${category.id}`}
                    passHref
                    legacyBehavior>
                      <div style={{ color: '#333', textDecoration: 'none' }}>
                        {category.name}
                      </div>
                      
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavbarCategories;
