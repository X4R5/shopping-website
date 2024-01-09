import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

function ContactPage() {
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken || '');
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/users/information', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ text: message }),
      });

      if (!response.ok) throw new Error('Failed to send message.');

      const result = await response.json();
      alert('Mesaj gönderildi!');
      setMessage('');
      window.location.href = '/';
    } catch (error) {
      console.error('Failed to send message:', error);
      alert(error.message);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container mt-5">
        {token ? (
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <h1 className="text-center mb-4">İletişim</h1>
              <form onSubmit={handleFormSubmit}>
                <textarea
                  className="form-control mb-3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here"
                  rows="5"
                  required
                ></textarea>
                <button type="submit" className="btn btn-orange w-100">Mesajı Gönder</button>
              </form>
            </div>
          </div>
        ) : (
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <p>İletişime geçmek için giriş yapınız.</p>
              <Link href="/login">
                Giriş Yap
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactPage;
