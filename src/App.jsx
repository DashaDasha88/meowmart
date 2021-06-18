import React, { useState, useEffect } from 'react';
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart } from "./components";
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
    const reponse = await commerce.cart.add(productId, quantity);

    setCart(response.cart);
  }

  //REMOVING ITEMS FROM THE CART
  const handleUpdateCartQty = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, quantity);

    setCart(response.cart);
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
            <Cart cart={cart} />
          </Route>

        </Switch>
      </div>
    </Router>
  )
}

export default App;
