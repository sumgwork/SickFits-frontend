import { mount } from "enzyme";
// import { ApolloConsumer } from "react-apollo";
import wait from "waait";
import toJSON from "enzyme-to-json";
import Cart from "../components/Cart";
import { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION } from "../components/Cart";
import User, { CURRENT_USER_QUERY } from "../components/User";
import { MockedProvider } from "react-apollo/test-utils";
import { fakeCartItem, fakeUser } from "../lib/testUtils";

import React, { Component } from "react";

const mocks = [
  {
    request: {
      query: CURRENT_USER_QUERY
    },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem()]
        }
      }
    }
  },
  {
    request: { query: LOCAL_STATE_QUERY },
    response: {
      data: { cartOpen: true }
    }
  }
];

describe("<Cart />", () => {
  it("renders properly and matches snapshot", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <Cart />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    expect(toJSON(wrapper.find("header"))).toMatchSnapshot();
    expect(wrapper.find("CartItem")).toHaveLength(1);
  });
});
