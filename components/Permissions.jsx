import React, { Component } from "react";
import Error from "./ErrorMessage";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      name
      email
      permissions
    }
  }
`;

class Permissions extends Component {
  state = {};
  render() {
    return (
      <Query query={ALL_USERS_QUERY}>
        {({ data, loading, error }) => {
          console.log("data", data);
          return (
            <div>
              <Error error={error} />
              <p>Permissions</p>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Permissions;
