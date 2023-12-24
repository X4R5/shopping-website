import React, { useState } from 'react';
import Navbar from '@/components/Navbar';

function Login() {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');  
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
      } else {
        setError(data.message || 'An error occurred');
      }
    } catch (error) {
      setError('Network error');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('localhost:3001/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registration successful:', data);
      } else {
        setError(data.message || 'An error occurred during registration');
      }
    } catch (error) {
      setError('Network error');
    }
  };



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

                      <form onSubmit={handleLogin}>
                      <div className="mb-3">
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Email" />
                        </div>
                        <div className="mb-4">
                            <input type="password" className="form-control" id="password" placeholder="Şifre" />
                        </div>
                      <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-orange btn-lg">Giriş Yap</button>
                      </div>
                      {error && <div className="alert alert-danger" role="alert">{error}</div>}
                      </form>
                  ) : (

                    <form onSubmit={handleRegister}>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="İism Soyisim"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
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
                  {error && <div className="alert alert-danger" role="alert">{error}</div>}
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
