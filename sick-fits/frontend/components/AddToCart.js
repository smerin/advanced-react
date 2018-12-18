import react from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

const AddToCart = ({ id, children }) => {
  return (
    <Mutation mutation={ADD_TO_CART_MUTATION} variables={{ id }}>
      {addToCart => (
        <button type="button" onClick={addToCart}>
          {children}
        </button>
      )}
    </Mutation>
  );
};

export default AddToCart;
