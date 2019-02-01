import { mount } from "enzyme";
import wait from "waait";
import toJSON from "enzyme-to-json";
import NProgress from "nprogress";
import Router from "next/router";
import ChargeMoney, { CREATE_ORDER_MUTATION } from "../components/ChargeMoney";
import { CURRENT_USER_QUERY } from "../components/User";
import { MockedProvider } from "react-apollo/test-utils";
import { fakeCartItem, fakeUser } from "../lib/testUtils";

Router.router = { push() {} };

const mocks = [
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
    request: { query: CREATE_ORDER_MUTATION }
  }
];
describe("<ChargeMoney />", () => {
  it("renders and matches snapshot", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ChargeMoney />
      </MockedProvider>
    );
    await wait();
    wrapper.update();

    const checkoutButton = wrapper.find("ReactStripeCheckout");
    expect(toJSON(checkoutButton)).toMatchSnapshot();
  });

  it("creates an order on token", () => {
    const createOrderMock = jest.fn().mockResolvedValue({
      data: { createOrder: { id: "xyz789" } }
    });
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ChargeMoney />
      </MockedProvider>
    );
    //   await wait();
    //   wrapper.update();
    const component = wrapper.find("ChargeMoney").instance();
    //manually call ontoken method
    component.onToken({ id: "abc123" }, createOrderMock);
    expect(createOrderMock).toHaveBeenCalled();
    expect(createOrderMock).toHaveBeenCalledWith({
      variables: { token: "abc123" }
    });
  });

  it("turns the progress bar on and pushes router", async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ChargeMoney />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    NProgress.start = jest.fn();
    Router.router.push = jest.fn();
    const createOrderMock = jest.fn().mockResolvedValue({
      data: { createOrder: { id: "xyz789" } }
    });
    const component = wrapper.find("ChargeMoney").instance();
    //manually call ontoken method
    component.onToken({ id: "abc123" }, createOrderMock);

    await wait();
    expect(NProgress.start).toHaveBeenCalled();
    expect(Router.router.push).toHaveBeenCalledWith({
      pathname: "/order",
      query: {
        id: "xyz789"
      }
    });
  });
});
