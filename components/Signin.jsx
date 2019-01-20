import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";

const SIGNIN = gql`
  mutation SIGNIN($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
    }
  }
`;

class Signin extends Component {
  state = { email: "", password: "" };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <Mutation
        mutation={SIGNIN}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signin, { error, loading }) => {
          return (
            <Form
              disabled={loading}
              aria-busy={loading}
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                let data = await signin();
                this.setState({ email: "", password: "" });
              }}
            >
              <h2>Sign In</h2>
              {loading && <h1>Loading</h1>}
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
              </fieldset>
              <button type="submit">Sign in</button>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Signin;
