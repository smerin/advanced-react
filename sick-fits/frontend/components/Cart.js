import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import User from "./User";
import CartStyles from "./styles/CartStyles";
import Supreme from "./styles/Supreme";
import CloseButton from "./styles/CloseButton";
import SickButton from "./styles/SickButton";

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
    <Mutation mutation={TOGGLE_CART_MUTATION}>
      {toggleCart => (
        <Query query={LOCAL_STATE_QUERY}>
          {({ data }) => (
            <CartStyles open={data.cartOpen}>
              <header>
                <CloseButton title="close" onClick={toggleCart}>
                  &times;
                </CloseButton>
                <Supreme>Your cart</Supreme>
                <User>
                  {({ data }) => {
                    const { cart } = data.me;
                    console.log(cart);

                    return (
                      <>
                        <p>You have {cart.length} items in your cart.</p>
                        {cart.map(item => (
                          <p>
                            {item.id} - {item.quantity}
                          </p>
                        ))}
                      </>
                    );
                  }}
                </User>
              </header>
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
};

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
