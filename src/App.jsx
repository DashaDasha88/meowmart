import React, { useState, useEffect } from 'react';
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart, Checkout } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  //GET PRODUCTS FROM COMMERCE API
  const fetchProducts = async () => {

    const { data } = await commerce.products.list();

    setProducts(data);

  }

  console.log(cart);

  //WHAT IS IN THE CART
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  }

  //WHICH PRODUCTS DO WE WANT TO ADD AND HOW MANY - pass it as a prop & use in Products component
  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);

    setCart(cart);
  }

  //UPDATING CART
  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, quantity);

    setCart(cart);
  }

  //REMOVING FROM CART
  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);
  }

  //CART IS EMPTY
  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();

    setCart(cart);
  }

  //USEEFFECT
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items}/>
        <Switch>

          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>

          <Route exact path="/cart">
            <Cart 
              cart={cart}
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />
          </Route>

          <Route exact path="/checkout">
            <Checkout />
          </Route>

        </Switch>
      </div>
    </Router>
  )
}

export default App;
