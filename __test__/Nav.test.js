import { mount } from "enzyme";
import wait from "waait";
import toJSON from "enzyme-to-json";
import Nav from "../components/Nav";
import { CURRENT_USER_QUERY } from "../components/User";
import { MockedProvider } from "react-apollo/test-utils";
import { fakeUser } from "../lib/testUtils";

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: null } }
  }
];

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: fakeUser() } }
  }
];

describe("<Nav />", () => {
  it("renders a minimal nav for signed out user", async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks}>
        <Nav />
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    const nav = wrapper.find('[data-test="nav"]');
    expect(toJSON(nav)).toMatchSnapshot();

    // console.log(wrapper.debug());
  });

  it("renders whole nav for signed in user", async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedInMocks}>
        <Nav />
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    const nav = wrapper.find('[data-test="nav"]');
    expect(toJSON(nav)).toMatchSnapshot();

    // console.log(wrapper.debug());
  });
});
