import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(id: $id) {
      id
      count
    }
  }
`;

const AddToCart = props => {
  return (
    <Mutation mutation={ADD_TO_CART_MUTATION} variables={{ id: props.item.id }}>
      {addToCart => <button onClick={addToCart}>Add to cart 🛒</button>}
    </Mutation>
  );
};

AddToCart.propTypes = {
  item: PropTypes.object.isRequired
};

export default AddToCart;
