import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import User from "./User";
import calcTotalPrice from "../lib/calcTotalPrice";

function totalItems(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem.count, 0);
}

class ChargeMoney extends Component {
  state = {};

  onToken(res) {
    console.log("token", res);
  }
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <StripeCheckout
            amount={calcTotalPrice(me.cart)}
            name="SG Shop"
            description={`Order of ${totalItems(me.cart)} items`}
            image={me.cart[0].item && me.cart[0].item.image}
            stripeKey="pk_test_mNJ7LmiQETKJwrhsJrq2Iskx"
            currency="USD"
            email={me.email}
            token={res => this.onToken(res)}
          >
            {this.props.children}
          </StripeCheckout>
        )}
      </User>
    );
  }
}

export default ChargeMoney;
