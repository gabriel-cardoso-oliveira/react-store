import React from "react";
import Button from "@material-ui/core/Button";

import { CartItemType } from "../../pages/home";
import { Wrapper } from "./styles";

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }: Props) => (
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
