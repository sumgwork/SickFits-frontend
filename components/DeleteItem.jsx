import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import Error from "./ErrorMessage";
import { GET_ALL_ITEMS } from "./Items";

const DELETE_ITEM = gql`
  mutation DELETE_ITEM($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

class DeleteItem extends Component {
  update(cache, payload) {
    const data = cache.readQuery({ query: GET_ALL_ITEMS });
    data.items = data.items.filter(
      item => item.id !== payload.data.deleteItem.id
    );
    cache.writeQuery({ query: GET_ALL_ITEMS, data });
  }
  render() {
    return (
      <Mutation
        mutation={DELETE_ITEM}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteItem, { error, loading }) => {
          // if (error) return <Error />;
          if (loading) return <p>loading</p>;
          return (
            <button
              onClick={() => {
                if (confirm("Are you sure you want to delete this item?")) {
                  deleteItem().catch(e => {
                    alert(e);
                  });
                }
              }}
            >
              {this.props.children}
            </button>
          );
        }}
      </Mutation>
    );
  }
}

export default DeleteItem;
