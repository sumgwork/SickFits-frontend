import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";
import styled from "styled-components";
import PropTypes from "prop-types";
import { times } from "async";

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${props => props.theme.red};
    cursor: pointer;
  }
`;

class RemoveFromCart extends Component {
  static propTypes = {
    cartItemId: PropTypes.string.isRequired
  };

  update = (cache, payload) => {
    const data = cache.readQuery({ query: CURRENT_USER_QUERY });
    data.me.cart = data.me.cart.filter(
      cartItem => cartItem.id !== payload.data.removeFromCart.id
    );
    cache.writeQuery({ query: CURRENT_USER_QUERY }, data);
  };

  render() {
    return (
      <Mutation
        update={this.update}
        mutation={REMOVE_FROM_CART_MUTATION}
        variables={{ id: this.props.cartItemId }}
        optimisticResponse={{
          __typename: "Mutation",
          removeFromCart: {
            __typename: "CartItem",
            id: this.props.cartItemId
          }
        }}
        // refetchQueries={[
        //   {
        //     query: CURRENT_USER_QUERY
        //   }
        // ]}
      >
        {(removeFromCart, { loading }) => (
          <BigButton
            onClick={() => removeFromCart().catch(err => alert(err.message))}
            disabled={loading}
          >
            &times;
            {loading && <span>&times;</span>}
          </BigButton>
        )}
      </Mutation>
    );
  }
}

export default RemoveFromCart;
