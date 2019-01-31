import { mount } from "enzyme";
import wait from "waait";
import toJSON from "enzyme-to-json";
import ForgotPassword from "../components/ForgotPassword";
import { REQUEST_RESET_MUTATION } from "../components/ForgotPassword";
import { MockedProvider } from "react-apollo/test-utils";

const mocks = [
  {
    request: {
      query: REQUEST_RESET_MUTATION,
      variables: { email: "sumit.govil@optus.com.au" }
    },
    result: {
      data: {
        requestReset: {
          message: "success",
          __typename: "message"
        }
      }
    }
  }
];

describe("<ForgotPassword />", () => {
  it("renders and matches snapshot", async () => {
    const wrapper = mount(
      <MockedProvider>
        <ForgotPassword />
      </MockedProvider>
    );
    const form = wrapper.find('form[data-test="form"]');
    console.log(form.debug());
    expect(toJSON(form)).toMatchSnapshot();
  });
});
