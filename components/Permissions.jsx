import React, { Component } from "react";
import Error from "./ErrorMessage";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Table from "./styles/Table";
import ShopButton from "./styles/ShopButton";

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

const possiblePermissions = [
  "ADMIN",
  "USER",
  "ITEMCREATE",
  "ITEMUPDATE",
  "ITEMDELETE",
  "PERMISSIONUPDATE"
];

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
              <h2>Manage Permissions</h2>
              <Table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    {possiblePermissions.map(permission => (
                      <th key={permission}>{permission}</th>
                    ))}
                    <th>👇</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.users &&
                    data.users.map(user => <User key={user.id} user={user} />)}
                </tbody>
              </Table>
            </div>
          );
        }}
      </Query>
    );
  }
}

class User extends Component {
  render() {
    const { user } = this.props;
    return (
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        {possiblePermissions.map(permission => (
          <td key={permission}>
            <label htmlFor={`${user.id}-${permission}`}>
              <input type="checkbox" />
            </label>
          </td>
        ))}
        <td>
          <ShopButton>Update</ShopButton>
        </td>
      </tr>
    );
  }
}

export default Permissions;
