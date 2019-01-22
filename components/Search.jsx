import React, { Component } from "react";
import Router from "next/router";
import { ApolloConsumer } from "react-apollo";
import Downshift from "downshift";
import gql from "graphql";
import debounce from "lodash.debounce";
import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";

class AutoComplete extends Component {
  render() {
    return (
      <SearchStyles>
        <div>
          <input type="search" />
          <DropDown>
            <p>Items will go here!</p>
          </DropDown>
        </div>
      </SearchStyles>
    );
  }
}

export default AutoComplete;
