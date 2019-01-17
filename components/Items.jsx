import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Item from "./Item";
import Pagination from "./Pagination";
import { perPage } from "../config";

const GET_ALL_ITEMS = gql`
  query GET_ALL_ITEMS($skip: Int = 0, $first: Int = ${perPage}) {
    items(
      skip: $skip
      first: $first
      orderBy: createdAt_DESC) {
      id
      title
      description
      image
      largeImage
      price
    }
  }
`;

const CenterDiv = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

class Items extends Component {
  state = {};
  render() {
    return (
      <CenterDiv>
        <Pagination page={this.props.page} />
        <Query
          query={GET_ALL_ITEMS}
          variables={{ skip: (this.props.page - 1) * perPage }}
        >
          {({ data, error, loading }) => {
            console.log("response data", data);

            if (error) return <h2>Error: {error.message}</h2>;
            if (loading) return <p>Loading</p>;
            return (
              <ItemsList>
                {data.items.map(item => (
                  <Item item={item} key={item.id} />
                ))}
              </ItemsList>
            );
          }}
        </Query>
        <Pagination page={this.props.page} />
      </CenterDiv>
    );
  }
}

export default Items;
export { GET_ALL_ITEMS };
