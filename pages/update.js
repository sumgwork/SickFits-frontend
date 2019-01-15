import React, { Component } from "react";
import UpdateItem from "../components/UpdateItem";

class Update extends Component {
  state = {};
  render() {
    return (
      <div>
        <UpdateItem id={this.props.query.id} />
      </div>
    );
  }
}

export default Update;
