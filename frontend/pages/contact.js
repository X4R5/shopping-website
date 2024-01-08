import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

function ContactPage() {
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) throw new Error('Failed to send message.');

      const result = await response.json();
      alert('Message sent successfully!');
      setMessage(''); // Clear the message field
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
          <h1>Contact Us</h1>
          <form onSubmit={handleFormSubmit}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here"
              rows="5"
              required
            ></textarea>
            <br />
            <button type="submit">Send Message</button>
          </form>
        </div>
      ) : (
        <div>
          <p>İletişime geçmek için giriş yapınız.</p>
          <Link href="/login">
            <a>Giriş Yap</a>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ContactPage;
