import React, { useRef } from 'react';
import Link from 'next/link';

import toast from 'react-hot-toast';
import {
  AiOutlineLeft, AiOutlineMinus, AiOutlinePlus, AiOutlineShopping,
} from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';

function Cart() {
  const cartRef = useRef();
  const {
    totalPrice, totalQuantities, cartItems,
    setShowCart, toggleCartItemQuantity, onRemove,
  } = useStateContext();

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button type="button" className="cart-heading" onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">Seu carrinho</span>
          <span className="cart-num-items">
            {totalQuantities}
            {' '}
            items
          </span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Sua sacola de compras está vazia</h3>
            <Link href="/">
              <button className="btn" type="button" onClick={() => setShowCart(false)}>Continuar comprando</button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className="product" key={item._id}>
              <img src={urlFor(item?.image[0])} alt="Product  in cart" className="cart-product-image" />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>
                    R$
                    {item.price}
                  </h4>
                </div>
                <div className="flex bottom">
                  <div>
                    <p className="quantity-desc">
                      <span className="minus" onClick={() => toggleCartItemQuantity(item._id, 'desc')}>
                        <AiOutlineMinus />
                      </span>
                      <span className="num">
                        {item.quantity}
                      </span>
                      <span className="plus" onClick={() => toggleCartItemQuantity(item._id, 'inc')}>
                        <AiOutlinePlus />
                      </span>
                    </p>
                  </div>
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cartItems.length >= 1 && (
        <div className="cart-bottom">
          <div className="total">
            <h3>Subtotal:</h3>
            <h3>
              R$
              {totalPrice.toFixed(2)}
            </h3>
          </div>
          <div className="btn-container">
            <button type="button" className="btn" onClick="">
              Pagar com stripe
            </button>
          </div>
        </div>
        )}

      </div>
    </div>
  );
}

export default Cart;
