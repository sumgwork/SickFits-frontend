import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Meta from "./Meta";

class Page extends Component {
  render() {
    return (
      <div>
        <Meta />
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Page;
