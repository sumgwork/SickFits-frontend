import React, { Component } from "react";
import CreateItem from "../components/CreateItem";
import SignedIn from "../components/SignedIn";

class Sell extends Component {
  state = {};
  render() {
    return (
      <div>
        <SignedIn>
          <CreateItem />
        </SignedIn>
      </div>
    );
  }
}

export default Sell;
