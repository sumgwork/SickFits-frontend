import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";

const SIGNOUT = gql`
  mutation SIGNOUT {
    signout {
      message
    }
  }
`;

const Signout = props => (
  <Mutation mutation={SIGNOUT} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
    {signout => <button onClick={signout}>Sign out</button>}
  </Mutation>
);

export default Signout;
