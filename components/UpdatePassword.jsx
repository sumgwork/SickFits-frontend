import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";

const UPDATE_PASSWORD_MUTATION = gql`
  mutation UPDATE_PASSWORD_MUTATION(
    $password: String!
    $confirmPassword: String!
    $resetToken: String!
  ) {
    resetPassword(
      password: $password
      confirmPassword: $confirmPassword
      resetToken: $resetToken
    ) {
      id
    }
  }
`;

class UpdatePassword extends Component {
  state = { password: "", confirmPassword: "" };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <Mutation
        mutation={UPDATE_PASSWORD_MUTATION}
        variables={{ ...this.state, resetToken: this.props.resetToken }}
        refetchQueries={[
          {
            query: CURRENT_USER_QUERY
          }
        ]}
      >
        {(resetPassword, { error, loading, called }) => {
          return (
            <Form
              disabled={loading}
              aria-busy={loading}
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                await resetPassword();
                this.setState({ password: "", confirmPassword: "" });
              }}
            >
              <h2>Update Password</h2>
              {loading && <h1>Loading</h1>}
              {!loading && !error && called && <p>Password Changed!</p>}
              <Error error={error} />
              <fieldset>
                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                  />
                </label>

                <label htmlFor="confirmPassword">
                  Confirm Password
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                    required
                  />
                </label>
              </fieldset>
              <button type="submit">Update Password </button>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default UpdatePassword;
