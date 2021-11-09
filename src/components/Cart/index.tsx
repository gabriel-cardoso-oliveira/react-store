import React, { FC } from "react";
import CartItem from "../CartItem";
import { Wrapper } from "./styles";
import { CartItemType } from "../../pages/home";

type CartProps = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: FC<CartProps> = ({
  cartItems,
  addToCart,
  removeFromCart,
}: CartProps) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce(
      (previousValue: number, item) => previousValue + item.amount * item.price,
      0
    );

  return (
    <Wrapper>
      <h2>React Store</h2>
      {cartItems.length === 0 && <p>No items in cart.</p>}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default Cart;
