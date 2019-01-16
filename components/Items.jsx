import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Item from "./Item";

const GET_ALL_ITEMS = gql`
  query GET_ALL_ITEMS {
    items {
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
        <Query query={GET_ALL_ITEMS}>
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
      </CenterDiv>
    );
  }
}

export default Items;
export { GET_ALL_ITEMS };
