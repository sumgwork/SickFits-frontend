import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";
import OrderStyles from "./styles/OrderStyles";
import OrderItemStyles from "./styles/OrderItemStyles";
import Head from "next/head";
import { format } from "date-fns";

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      id
      charge
      total
      createdAt
      items {
        id
        price
        title
        description
        image
        count
      }
      user {
        id
      }
    }
  }
`;
class Order extends Component {
  state = {};
  render() {
    return (
      <Query query={SINGLE_ORDER_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading!</p>;
          if (error) return <Error error={error} />;
          const order = data.order;
          return (
            <OrderStyles data-test="order">
              <Head>
                <title>SG Shop | Order {order.id}</title>
              </Head>
              <p>
                <span>Order ID</span>
                <span>{order.id}</span>
              </p>
              <p>
                <span>Charge</span>
                <span>{order.charge}</span>
              </p>
              <p>
                <span>Date</span>
                <span>{format(order.createdAt, "MMMM d, yyyy h:mm a")}</span>
              </p>
              <p>
                <span>Total</span>
                <span>{formatMoney(order.total)}</span>
              </p>
              <p>
                <span>Items</span>
                <span>{order.items.length}</span>
              </p>
              <div className="items">
                {order.items.map(item => (
                  <div className="order-item" key={item.id}>
                    <img src={item.image} alt={item.title} />
                    <div className="item-details">
                      <h2>{item.title}</h2>
                      <p>Qty: {item.count}</p>
                      <p>Each: {formatMoney(item.price)}</p>
                      <p>Subtotal: {formatMoney(item.count * item.price)}</p>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </OrderStyles>
          );
        }}
      </Query>
    );
  }
}

export default Order;
export { SINGLE_ORDER_QUERY };
