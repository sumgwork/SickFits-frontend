import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Router from "next/router";
import formatMoney from "../lib/formatMoney";
import Form from "./styles/Form";
import Error from "./ErrorMessage";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/sumitgovilstudy";
const CLOUDINARY_UPLOAD_PRESET = "sickfits";

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

const ImageHolder = styled.div`
  text-align: center;
`;

class CreateItem extends Component {
  state = {
    title: "",
    description: "",
    price: 0,
    image: "",
    largeImage: ""
  };

  uploadFile = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    const res = await fetch(`${CLOUDINARY_URL}/upload`, {
      method: "POST",
      body: data
    });

    const file = await res.json();
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({
      [name]: val
    });
  };

  render() {
    return (
      <div>
        <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
          {(createItem, { loading, error, called, data }) => (
            <Form
              onSubmit={async e => {
                e.preventDefault();
                const res = await createItem();
                Router.push({
                  pathname: "/item",
                  query: { id: res.data.createItem.id }
                });
              }}
              data-test="form"
            >
              <Error error={error} />
              <fieldset aria-busy={loading} disabled={loading}>
                <ImageHolder>
                  {this.state.image && (
                    <img src={this.state.image} alt="image" />
                  )}
                </ImageHolder>

                <label htmlFor="file">
                  Image
                  <input
                    type="file"
                    id="file"
                    placeholder="Upload file"
                    name="file"
                    onChange={this.uploadFile}
                    required
                  />
                </label>

                <label htmlFor="title">
                  Title
                  <input
                    type="text"
                    id="title"
                    placeholder="Title"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleChange}
                    required
                  />
                </label>

                <label htmlFor="price">
                  Price
                  <input
                    type="number"
                    id="price"
                    placeholder="Price"
                    name="price"
                    value={this.state.price}
                    onChange={this.handleChange}
                    required
                  />
                </label>

                <label htmlFor="description">
                  Description
                  <textarea
                    id="description"
                    placeholder="Enter description of the item"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                    required
                  />
                </label>

                <button type="submit">Submit</button>
              </fieldset>
            </Form>
          )}
        </Mutation>
      </div>
    );
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
