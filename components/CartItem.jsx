import React from "react";
import styled from "styled-components";
import formatMoney from "../lib/formatMoney";

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

const CartItem = ({ item, count }) => {
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
    </CartItemStyles>
  );
};

export default CartItem;
