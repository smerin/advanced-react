import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import User from "./User";
import CartStyles from "./styles/CartStyles";
import Supreme from "./styles/Supreme";
import CloseButton from "./styles/CloseButton";
import SickButton from "./styles/SickButton";
import CartItem from "./CartItem";

const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;

const Cart = () => {
  return (
    <User>
      {({ data: { me } }) => {
        if (!me) return null;
        return (
          <Mutation mutation={TOGGLE_CART_MUTATION}>
            {toggleCart => (
              <Query query={LOCAL_STATE_QUERY}>
                {({ data }) => (
                  <CartStyles open={data.cartOpen}>
                    <header>
                      <CloseButton title="close" onClick={toggleCart}>
                        &times;
                      </CloseButton>
                      <Supreme>{me.name}'s cart</Supreme>
                      <p>
                        You have {me.cart.length} item
                        {me.cart.length === 1 ? "" : "s"} in your cart.
                      </p>
                    </header>
                    <ul>
                      {me.cart.map(item => (
                        <CartItem key={item.id} item={item} />
                      ))}
                    </ul>
                    <footer>
                      <p>$10.00</p>
                      <SickButton>Checkout</SickButton>
                    </footer>
                  </CartStyles>
                )}
              </Query>
            )}
          </Mutation>
        );
      }}
    </User>
  );
};

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
