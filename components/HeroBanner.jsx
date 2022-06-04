import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { urlFor } from '../lib/client';

function HeroBanner({ heroBanner }) {
  const bannerUrl = urlFor(heroBanner.image).url();
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <div className="hero-banner-image">
          <Image src={bannerUrl} alt="Headphones" layout="fill" />
        </div>

        <div>
          <Link href={`/products/${heroBanner.product}`}>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Descrição</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
