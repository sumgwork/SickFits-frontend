import React, { Component } from "react";
import PropTypes from "prop-types";
import Error from "./ErrorMessage";
import { Query, Mutation } from "react-apollo";
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

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation UPDATE_PERMISSIONS_MUTATION(
    $userId: ID!
    $permissions: [Permission]!
  ) {
    updatePermissions(userId: $userId, permissions: $permissions) {
      id
      email
      name
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
      <Mutation
        mutation={UPDATE_PERMISSIONS_MUTATION}
        variables={{
          permissions: this.state.permissions,
          userId: user.id
        }}
      >
        {(updatePermissions, { data, loading, error }) => (
          <>
            {error && (
              <tr>
                <td colSpan="8">
                  <Error error={error} />
                </td>
              </tr>
            )}
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {possiblePermissions.map(permission => (
                <td key={permission}>
                  <label htmlFor={`${user.id}-${permission}`}>
                    <input
                      type="checkbox"
                      id={`${user.id}-${permission}`}
                      checked={this.state.permissions.includes(permission)}
                      onChange={() => this.togglePermission(permission)}
                    />
                  </label>
                </td>
              ))}

              <td>
                <ShopButton
                  onClick={updatePermissions}
                  type="button"
                  disabled={loading}
                >
                  Updat{loading ? "ing" : "e"}
                </ShopButton>
              </td>
            </tr>
          </>
        )}
      </Mutation>
    );
  }
}

export default Permissions;
