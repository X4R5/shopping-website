import React, { useState } from 'react';
import Navbar from '@/components/Navbar';

function Login() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card p-5">
              <div className="card-body">
                <div className="btn-group mb-5 w-100" role="group">
                  <button
                    type="button"
                    className={`btn ${activeTab === 'login' ? 'btn-orange' : 'btn-orange-outline'}`}
                    onClick={() => setActiveTab('login')}
                  >
                    Giriş Yap
                  </button>
                  <button
                    type="button"
                    className={`btn ${activeTab === 'register' ? 'btn-orange' : 'btn-orange-outline'}`}
                    onClick={() => setActiveTab('register')}
                  >
                    Üye Ol
                  </button>
                </div>
                {/* Formlar */}
                {activeTab === 'login' ? (

                    <form>
                        <div className="mb-3">
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Email" />
                        </div>
                        <div className="mb-4">
                            <input type="password" className="form-control" id="password" placeholder="Şifre" />
                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-orange btn-lg">Giriş Yap</button>
                        </div>
                    </form>
                ) : (

                  <form>
                        <div className="mb-3">
                            <input type="name" className="form-control" id="name" placeholder="İsim Soyisim" />
                        </div>
                        <div className="mb-3">
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Email" />
                        </div>
                        <div className="mb-4">
                            <input type="password" className="form-control" id="password" placeholder="Şifre" />
                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-orange btn-lg">Üye Ol</button>
                        </div>
                    </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
