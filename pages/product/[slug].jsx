/* eslint-disable no-underscore-dangle */
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import {
  AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar,
} from 'react-icons/ai';
import { useRouter } from 'next/router';
import { client, urlFor } from '../../lib/client';

import Product from '../../components/Product';
import { useStateContext } from '../../context/StateContext';

function ProductDetails({ product, products }) {
  const router = useRouter();
  const { slug } = router.query;

  const {
    image, name, details, price,
  } = product;

  const [index, setIndex] = useState(0);

  const {
    decQty, incQty, qty, setQty,
  } = useStateContext();

  useEffect(() => {
    setQty(0);
  }, [slug]);

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <div className="product-details-image">
              <Image
                src={urlFor(image && image[index]).url()}
                width={500}
                height={500}
              />
            </div>
          </div>

          <div className="small-images-container">
            {image?.map((item, i) => (
              <div key={`image#${Math.random() * 10}`}>
                <Image
                  src={urlFor(item).url()}
                  className={i === index ? 'small-image selected-image' : 'small-image'}
                  onMouseEnter={() => setIndex(i)}
                  width={100}
                  height={100}
                />
              </div>
            ))}
          </div>

        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div>

          <h4>Detalhes: </h4>
          <p>{details}</p>
          <p className="price">
            R$
            {' '}
            {price}
          </p>
          <div className="quantity">
            <h3>Quantidade: </h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num" onClick="">
                {qty}
              </span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
            <button className="add-to-cart" type="button" onClick="">
              Adicionar ao carrinho
            </button>
            <button className="buy-now" type="button" onClick="">
              Comprar agora
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>Você também pode gostar</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
