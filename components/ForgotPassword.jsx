import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

class ForgotPassword extends Component {
  state = { email: "" };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
        {(requestReset, { error, loading, called }) => {
          return (
            <Form
              disabled={loading}
              aria-busy={loading}
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                await requestReset();
                this.setState({ email: "" });
              }}
            >
              <h2>Forgot Password</h2>
              {loading && <h1>Loading</h1>}
              {!loading && !error && called && <p>Check your email!</p>}
              <Error error={error} />
              <fieldset>
                <label htmlFor="email">
                  Email
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                  />
                </label>
              </fieldset>
              <button type="submit">Request Reset</button>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default ForgotPassword;
