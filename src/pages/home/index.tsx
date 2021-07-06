import React, { useState, useEffect } from "react";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";

import api from "../../services/api";
import Item from "../../components/Item";
import Cart from "../../components/Cart";

import { Wrapper, StyledButton } from "./style";

export type CartItemType = {
  id: number;
  image: string;
  price: number;
  name: string;
  amount: number;
};

const Home: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const [products, setProducts] = useState<CartItemType[]>();
  const [err, setErr] = useState(false);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        }
        return [...ack, item];
      }, [] as CartItemType[])
    );
  };

  async function handleGetItems(): Promise<void> {
    try {
      const { data } = await api.get<CartItemType[]>("product");

      setProducts(data);

      setErr(false);
    } catch (error) {
      setErr(true);
    }
  }

  useEffect(() => {
    handleGetItems();
  }, []);

  if (err) return <div>Something went wrong ...</div>;

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <AppBar color="default">
        <Toolbar>
          <Typography style={{ flexGrow: 1 }} variant="h6">
            React Store
          </Typography>
          <StyledButton onClick={() => setCartOpen(true)}>
            <Badge badgeContent={getTotalItems(cartItems)} color="error">
              <AddShoppingCartIcon />
            </Badge>
          </StyledButton>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3}>
        {products?.map((product) => (
          <Grid item key={product.id} xs={12} sm={4} md={3}>
            <Item item={product} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default Home;
