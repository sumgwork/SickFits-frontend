import React from "react";
import { Query } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";
import Signin from "./Signin";

const SignedIn = props => {
  return (
    <div>
      <Query query={CURRENT_USER_QUERY}>
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data.me) {
            return (
              <div>
                <p>Please login first</p>
                <Signin />
              </div>
            );
          }
          return <div>{props.children}</div>;
        }}
      </Query>
    </div>
  );
};

export default SignedIn;
