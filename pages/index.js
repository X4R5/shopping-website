import React from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';

function HomePage() {
  return (
    <div>
      <Navbar />
      
      <div>
        <h1>Merhaba, Next.js</h1>
        <p>Next.js uygulamanızın ana sayfasına hoş geldiniz.</p>
      </div>
    </div>
  );
}

export default HomePage;
