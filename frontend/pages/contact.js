import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

function ContactPage() {
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken || '');
  }, []); // This effect runs once, similar to componentDidMount

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
      {token ? (
        <div>
          <h1>İletişim</h1>
          <form onSubmit={handleFormSubmit}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here"
              rows="5"
              required
            ></textarea>
            <br />
            <button type="submit" className='btn btn-orange'>Mesajı Gönder</button>
          </form>
        </div>
      ) : (
        <div>
          <p>İletişime geçmek için giriş yapınız.</p>
          <Link href="/login">Giriş Yap</Link>
        </div>
      )}
    </div>
  );
}

export default ContactPage;
