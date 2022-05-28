import React from 'react';
import Head from 'next/head';

import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className="layout">
      <Head>
        <title>Eletronics Produtos</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main>
        <main className="main-container">
          {children}
        </main>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
