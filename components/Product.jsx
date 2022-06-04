import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '../lib/client';

function Product({ product }) {
  return (
    <div>
      <Link href={`/product/${product.slug.current}`}>
        <div className="product-card">
          <div className="product-image">
            <Image
              src={urlFor(product.image && product.image[0]).url()}
              alt="Product card"
              width={250}
              height={250}
            />
          </div>

          <p className="product-name">{product.name}</p>
          <p className="product-price">
            R$
            {' '}
            {product.price}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default Product;
