import React from 'react';

import { Product, FooterBanner, HeroBanner } from '../components';

function Home() {
  return (
    <>
      <HeroBanner />

      <div className="products-heading">
        <h2>Os melhores produtos</h2>
        <p>Os mais variados fones de ouvidos</p>
      </div>

      <div className="products-container">
        {['Product 1', 'Product 2'].map(
          (product) => <Product key={new Date().getMilliseconds()} />,
        )}
      </div>

      <FooterBanner />
    </>
  );
}

export default Home;
