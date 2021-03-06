import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password) {
      id
      name
      email
    }
  }
`;

class Signup extends Component {
  state = { name: "", email: "", password: "" };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]} //For calling this query after current mutation is successfully completed
      >
        {(signup, { error, loading }) => {
          if (error) return <Error error={error} />;
          return (
            <Form
              disabled={loading}
              aria-busy={loading}
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                let data = await signup();
                console.log("Data", data);
                this.setState({ name: "", email: "", password: "" });
              }}
            >
              <h2>Sign Up</h2>
              {loading && <h1>Loading</h1>}
              <fieldset>
                <label htmlFor="name">
                  Name
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    required
                  />
                </label>

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
              <button type="submit">Sign Up</button>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Signup;
export { SIGNUP_MUTATION };
