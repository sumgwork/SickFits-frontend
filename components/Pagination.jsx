import React from "react";
import PaginationStyles from "./styles/PaginationStyles";
import gql from "graphql-tag";
import Head from "next/head";
import Link from "next/link";
import { Query } from "react-apollo";
import { perPage } from "../config";

const GET_ITEM_DATA = gql`
  query GET_ITEM_DATA {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => {
  const page = props.page;
  return (
    <Query query={GET_ITEM_DATA}>
      {({ data, loading, error }) => {
        if (loading) return <p>loading</p>;
        const count = data.itemsConnection.aggregate.count;
        const pages = Math.ceil(count / perPage);
        return (
          <PaginationStyles>
            <Head>
              <title>
                SG Shop | Page {page} of {pages}
              </title>
            </Head>
            <p>
              <Link
                prefetch
                href={{
                  pathname: "/items",
                  query: { page: page - 1 }
                }}
              >
                <a className="link" aria-disabled={page <= 1}>
                  &lt; Previous
                </a>
              </Link>
            </p>
            <p>
              Page {page} of {pages}
            </p>
            <p>{count} items</p>
            <p>
              <Link
                prefetch
                href={{
                  pathname: "/items",
                  query: { page: page + 1 }
                }}
              >
                <a className="link" aria-disabled={page >= pages}>
                  Next &gt;
                </a>
              </Link>
            </p>
          </PaginationStyles>
        );
      }}
    </Query>
  );
};

export default Pagination;
