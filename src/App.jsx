import React, { useState, useEffect } from 'react';
import { commerce } from "./lib/commerce";
import { Products, Navbar } from "./components";

const App = () => {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  //GET PRODUCTS FROM COMMERCE API
  const fetchProducts = async () => {

    const { data } = await commerce.products.list();

    setProducts(data);

  }

  //WHAT IS IN THE CART
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  }

  //WHICH PRODUCTS DO WE WANT TO ADD AND HOW MANY - pass it as a prop & use in Products component
  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  }

  //USEEFFECT
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <div>
      <Navbar totalItems={cart.total_items}/>
      <Products products={products} onAddToCart={handleAddToCart} />
    </div>
  )
}

export default App;
