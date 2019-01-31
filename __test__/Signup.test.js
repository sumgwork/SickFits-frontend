import { mount } from "enzyme";
import { ApolloConsumer } from "react-apollo";
import wait from "waait";
import toJSON from "enzyme-to-json";
import Signup from "../components/Signup";
import { SIGNUP_MUTATION } from "../components/Signup";
import { CURRENT_USER_QUERY } from "../components/User";
import { MockedProvider } from "react-apollo/test-utils";
import { fakeUser } from "../lib/testUtils";

function type(wrapper, name, value) {
  wrapper.find(`input[name="${name}"]`).simulate("change", {
    target: { name, value }
  });
}
const me = fakeUser();
const mocks = [
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        email: me.email,
        name: me.name,
        password: "abc"
      }
    },
    result: {
      data: {
        signup: {
          __typename: "User",
          id: "abc123",
          email: me.email,
          name: me.name
        }
      }
    }
  },
  {
    request: {
      query: CURRENT_USER_QUERY
    },
    result: {
      data: {
        me: me
      }
    }
  }
];

describe("<Signup />", () => {
  it("renders properly", () => {
    const wrapper = mount(
      <MockedProvider>
        <Signup />
      </MockedProvider>
    );

    expect(toJSON(wrapper.find("Form"))).toMatchSnapshot();
  });

  it("calls the mutation properly", async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <Signup />;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
    await wait();

    type(wrapper, "name", me.name);
    type(wrapper, "email", me.email);
    type(wrapper, "password", "abc");
    wrapper.update();
    wrapper.find("form").simulate("submit");

    await wait();

    //query the user out of apollo client
    const user = await apolloClient.query({
      query: CURRENT_USER_QUERY
    });

    expect(user.data.me).toMatchObject(me);
  });
});
