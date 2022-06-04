import React, { useEffect } from 'react';

import { BsBagCheckFill } from 'react-icons/bs';

import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';

function success() {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Agradecemos pelo seu pedido!</h2>
        <p className="email-msg">Verifique o seu email para o recibo.</p>
        <p className="description">
          Se você tiver alguma dúvida, por favor nos envie um email
          <a href="mailto:techshop@example.com" className="email">techshop@example.com</a>
        </p>
      </div>
    </div>
  );
}

export default success;
