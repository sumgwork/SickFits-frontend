import { mount } from "enzyme";
import wait from "waait";
import toJSON from "enzyme-to-json";
import CreateItem from "../components/CreateItem";
import { CREATE_ITEM_MUTATION } from "../components/CreateItem";
import { MockedProvider } from "react-apollo/test-utils";
import { fakeItem } from "../lib/testUtils";
import Router from "next/router";

const dogImage = "https://dog.com/dog.jpg";
//mock global fetch API
global.fetch = jest.fn().mockResolvedValue({
  json: () => ({
    secure_url: dogImage,
    eager: [{ secure_url: dogImage }]
  })
});

describe("<CreateItem />", () => {
  it("renders and matches snapshot", () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    );
    const form = wrapper.find('form[data-test="form"]');
    expect(toJSON(form)).toMatchSnapshot();
  });

  it("uploads a file", async () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    );
    const input = wrapper.find('input[type="file"]');
    input.simulate("change", {
      target: { files: ["fakedog.jpg"] }
    });
    await wait();
    wrapper.update();
    const component = wrapper.find("CreateItem").instance();
    expect(component.state.image).toEqual(dogImage);
    expect(component.state.largeImage).toEqual(dogImage);
    expect(global.fetch).toHaveBeenCalled();
    global.fetch.mockReset();
  });

  it("handles state updating", async () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateItem />
      </MockedProvider>
    );
    const item = fakeItem();
    wrapper.find("#title").simulate("change", {
      target: { value: item.title, name: "title" }
    });
    wrapper.find("#price").simulate("change", {
      target: { value: item.price, name: "price", type: "number" }
    });
    wrapper.find("#description").simulate("change", {
      target: { value: item.description, name: "description" }
    });
    expect(wrapper.find("CreateItem").instance().state).toMatchObject({
      title: item.title,
      price: item.price,
      description: item.description
    });
  });

  it("creates an item on submission", async () => {
    const item = fakeItem();
    const mocks = [
      {
        request: {
          query: CREATE_ITEM_MUTATION,
          variables: {
            title: item.title,
            description: item.description,
            price: item.price,
            image: "",
            largeImage: ""
          }
        },
        result: {
          data: {
            createItem: {
              ...fakeItem,
              id: "abc",
              __typename: "fakeItem"
            }
          }
        }
      }
    ];

    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <CreateItem />
      </MockedProvider>
    );

    //simulate filling out the form
    wrapper.find("#title").simulate("change", {
      target: { value: item.title, name: "title" }
    });
    wrapper.find("#price").simulate("change", {
      target: { value: item.price, name: "price", type: "number" }
    });
    wrapper.find("#description").simulate("change", {
      target: { value: item.description, name: "description" }
    });

    //mock the router
    Router.router = { push: jest.fn() };

    wrapper.find("form").simulate("submit");

    await wait(50);
    wrapper.update();
    expect(Router.router.push).toHaveBeenCalled();
    expect(Router.router.push).toHaveBeenCalledWith({
      pathname: "/item",
      query: { id: "abc" }
    });
  });
});
