import React, { FC } from "react";
import Button from "@material-ui/core/Button";

import { CartItemType } from "../../pages/home";
import { Wrapper } from "./styles";

type ItemProps = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: FC<ItemProps> = ({ item, handleAddToCart }: ItemProps) => (
  <Wrapper>
    <img src={item.image} alt={item.name} />
    <div>
      <h3>{item.name}</h3>
      <h3>${item.price}</h3>
    </div>
    <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
  </Wrapper>
);

export default Item;
