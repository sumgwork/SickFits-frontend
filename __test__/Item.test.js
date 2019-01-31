import { shallow } from "enzyme";
import Item from "../components/Item";
import toJSON from "enzyme-to-json";

const fakeItem = {
  id: "ABC",
  title: "A cool item",
  description: "This item is cool!",
  image: "dog.jpg",
  largeImage: "largeDog.jpg",
  price: 5000
};

describe("<Item />", () => {
  it("should render the image properly", () => {
    const wrapper = shallow(<Item item={fakeItem} />);
    const img = wrapper.find("img");
    expect(img.props().src).toBe(fakeItem.image);
    expect(img.props().alt).toBe(fakeItem.title);
    // console.log(wrapper.debug());
  });
  it("should render title and price properly", () => {
    const wrapper = shallow(<Item item={fakeItem} />);
    const PriceTag = wrapper.find("PriceTag");
    expect(PriceTag.children().text()).toBe("A$50");
    expect(wrapper.find("Title a").text()).toBe(fakeItem.title);
  });

  it("should render out the buttons properly", () => {
    const wrapper = shallow(<Item item={fakeItem} />);
    const buttonList = wrapper.find(".buttonList");
    expect(buttonList.children()).toHaveLength(3);
    expect(buttonList.find("Link").exists()).toBeTruthy();
    expect(buttonList.find("AddToCart").exists()).toBeTruthy();
    expect(buttonList.find("DeleteItem").exists()).toBe(true);
  });

  it("renders and matches the snapshot", () => {
    const wrapper = shallow(<Item item={fakeItem} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
