import React from "react";

import formatMoney from "../lib/formatMoney";
import styled from "styled-components";

const CartItemStyles = styled.li``;

const CartItem = ({ item }) => (
  <CartItemStyles>
    <p>Hi {item.id}</p>
  </CartItemStyles>
);

export default CartItem;
