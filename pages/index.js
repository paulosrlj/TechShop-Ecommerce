import React from 'react';

function Home() {
  return (
    <>
      Hero Banner

      <div className="products-heading">
        <h2>Os melhores produtos</h2>
        <p>Os mais variados fones de ouvidos</p>
      </div>

      <div className="products-container">
        {['Product 1', 'Product 2'].map(
          (product) => product,
        )}
      </div>

      Footer
    </>
  );
}

export default Home;
