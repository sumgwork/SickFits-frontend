import { mount } from "enzyme";
import wait from "waait";
import toJSON from "enzyme-to-json";
import Pagination from "../components/Pagination";
import { GET_ITEM_DATA } from "../components/Pagination";
import { MockedProvider } from "react-apollo/test-utils";
import Router from "next/router";

// Router.router = {
//     push:
// }

function makeMocksFor(length) {
  return [
    {
      request: { query: GET_ITEM_DATA },
      result: {
        data: {
          itemsConnection: {
            __typename: "aggregate",
            aggregate: {
              __typename: "count",
              count: length
            }
          }
        }
      }
    }
  ];
}

describe("<Pagination />", () => {
  it("displays a loading message", () => {
    const wrapper = mount(
      <MockedProvider mocks={makeMocksFor(1)}>
        <Pagination page={1} />
      </MockedProvider>
    );
    console.log(wrapper.debug());
    expect(wrapper.text()).toContain("loading");
  });
});
