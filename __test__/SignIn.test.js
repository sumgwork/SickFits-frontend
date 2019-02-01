import { mount } from "enzyme";
import wait from "waait";
import SignIn from "../components/SignIn";
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

describe("<SignIn />", () => {
  it("renders the sign in dialog to logged out users", async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks}>
        <SignIn />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    expect(wrapper.text()).toContain("Sign In");
    expect(wrapper.find("Signin").exists()).toBe(true);
  });

  //   it("renders the child component when the user is signed in", async () => {
  //     const Hey = () => <p>Hey!</p>;
  //     const wrapper = mount(
  //       <MockedProvider mocks={signedInMocks}>
  //         <SignIn>
  //           <Hey />
  //         </SignIn>
  //       </MockedProvider>
  //     );
  //     await wait();
  //     wrapper.update();
  //     console.log(wrapper.debug());
  //     expect(wrapper.find("Hey").exists()).toBe(true);
  //   });
});
