import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";
import styled from "styled-components";
import PropTypes from "prop-types";

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
  render() {
    return (
      <Mutation
        mutation={REMOVE_FROM_CART_MUTATION}
        variables={{ id: this.props.cartItemId }}
        refetchQueries={[
          {
            query: CURRENT_USER_QUERY
          }
        ]}
      >
        {(removeFromCart, { loading }) => (
          <BigButton
            onClick={() => removeFromCart().catch(err => alert(err.message))}
            disabled={loading}
          >
            &times;
          </BigButton>
        )}
      </Mutation>
    );
  }
}

export default RemoveFromCart;
