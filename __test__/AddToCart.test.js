import { mount } from "enzyme";
import wait from "waait";
import toJSON from "enzyme-to-json";
import AddToCart, { ADD_TO_CART_MUTATION } from "../components/AddToCart";
import { CURRENT_USER_QUERY } from "../components/User";
import { MockedProvider } from "react-apollo/test-utils";
import { fakeCartItem, fakeUser } from "../lib/testUtils";
import { ApolloConsumer } from "react-apollo";

const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: []
        }
      }
    }
  },
  {
    request: { query: CURRENT_USER_QUERY },
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
    request: { query: ADD_TO_CART_MUTATION, variables: { id: "abc123" } },
    result: {
      data: {
        addToCart: {
          ...fakeCartItem(),
          count: 1
        }
      }
    }
  }
];

describe("<AddToCart />", () => {
  it("renders and matches snapshot", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <AddToCart item={{ id: "abc123" }} />
      </MockedProvider>
    );
    await wait();
    wrapper.update();

    expect(toJSON(wrapper.find("button"))).toMatchSnapshot();
  });

  it("adds an item to the cart when clicked", async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <AddToCart item={{ id: "abc123" }} />;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    const {
      data: { me }
    } = await apolloClient.query({ query: CURRENT_USER_QUERY });

    expect(me.cart).toHaveLength(0);

    //add an item to the cart
    wrapper.find("button").simulate("click");
    await wait();
    const res = await apolloClient.query({ query: CURRENT_USER_QUERY });
    const me2 = res.data.me;
    wrapper.update();
    expect(me2.cart).toHaveLength(1);
    expect(me2.cart[0].id).toBe(fakeCartItem().id);
    expect(me2.cart[0].count).toBe(fakeCartItem().count);
  });

  it("changes text from add to adding on click", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <AddToCart item={{ id: "abc123" }} />
      </MockedProvider>
    );
    wrapper.find("button").simulate("click");
    expect(wrapper.text()).toContain("Adding");
    await wait();
    expect(wrapper.text()).toContain("Add to cart");
  });
});
