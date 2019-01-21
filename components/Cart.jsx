import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import CartStyles from "./styles/CartStyles";
import Supreme from "./styles/Supreme";
import CloseButton from "./styles/CloseButton";
import ShopButton from "./styles/ShopButton";
import User from "./User";
import CartItem from "./CartItem";
import calcTotalPrice from "../lib/calcTotalPrice";
import formatMoney from "../lib/formatMoney";

const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;

const Cart = props => {
  return (
    <User>
      {({ data: { me } }) => {
        if (!me) return null;
        return (
          <Mutation mutation={TOGGLE_CART_MUTATION}>
            {toggleCart => (
              <Query query={LOCAL_STATE_QUERY}>
                {({ data }) => (
                  <CartStyles open={data && data.cartOpen}>
                    <header>
                      <CloseButton title="close" onClick={toggleCart}>
                        &times;
                      </CloseButton>
                      <Supreme>{me.name}'s Cart</Supreme>
                      <p>
                        You have {me.cart.length} item
                        {me.cart.length <= 1 ? "" : "s"} in your cart.
                      </p>
                    </header>
                    <main>
                      <ul>
                        {me.cart.map(cartItem => (
                          <CartItem
                            key={cartItem.id}
                            item={cartItem.item}
                            count={cartItem.count}
                          />
                        ))}
                      </ul>
                    </main>
                    <footer>
                      <p>{formatMoney(calcTotalPrice(me.cart))}</p>
                      <ShopButton>Checkout</ShopButton>
                    </footer>
                  </CartStyles>
                )}
              </Query>
            )}
          </Mutation>
        );
      }}
    </User>
  );
};

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
