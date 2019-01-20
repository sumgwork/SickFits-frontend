import React, { Component } from "react";
import PropTypes from "prop-types";
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
                    data.users.map(user => (
                      <UserPermission key={user.id} user={user} />
                    ))}
                </tbody>
              </Table>
            </div>
          );
        }}
      </Query>
    );
  }
}

class UserPermission extends Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      permissions: PropTypes.array
    }).isRequired
  };
  state = { permissions: this.props.user.permissions };
  //Seeding data - want to isolate state of UserPermission, so populating it from props.
  //Change to state will not change props properties

  togglePermission(permission) {
    let updatedPermissions = [...this.state.permissions];
    if (updatedPermissions.includes(permission)) {
      //remove permission
      updatedPermissions = updatedPermissions.filter(
        permissionItem => permissionItem !== permission
      );
    } else {
      updatedPermissions.push(permission);
    }
    this.setState({ permissions: updatedPermissions });
  }

  render() {
    const { user } = this.props;
    return (
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        {possiblePermissions.map(permission => (
          <td key={permission}>
            <label htmlFor={`${user.id}-${permission}`}>
              <input
                type="checkbox"
                checked={this.state.permissions.includes(permission)}
                onChange={() => this.togglePermission(permission)}
              />
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
