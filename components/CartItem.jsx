import React from "react";
import styled from "styled-components";
import formatMoney from "../lib/formatMoney";

import RemoveFromCart from "./RemoveFromCart";

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.lightgrey};
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  img {
    margin-right: 10px;
  }
  h3,
  p {
    margin: 0;
  }
`;

const CartItem = ({ item, count, cartItemId }) => {
  //Check if item exists
  if (!item) {
    return (
      <CartItemStyles>
        <p>Item does not exist.</p>
        <RemoveFromCart cartItemId={cartItemId} />
      </CartItemStyles>
    );
  }

  return (
    <CartItemStyles>
      <img width="100" src={item.image} alt={item.title} />
      <div className="cart-item-details">
        <h3>{item.title}</h3>
        <p>
          {formatMoney(item.price * count)}
          {" - "}
          <em>
            {count} &times; {formatMoney(item.price)}
          </em>
        </p>
      </div>
      <RemoveFromCart cartItemId={cartItemId} />
    </CartItemStyles>
  );
};

export default CartItem;
