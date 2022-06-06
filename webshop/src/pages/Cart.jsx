import { useState } from "react";
import "../css/Cart.css";

function Cart() {
  const [cartProducts, setCartProducts] = useState(
    JSON.parse(sessionStorage.getItem("cartProducts")) || []
  );

  const decreaseQuantity = (productClicked) => {
    const index = cartProducts.findIndex(element => element.product.id === productClicked.product.id);
    cartProducts[index].quantity--;
    if (cartProducts[index].quantity === 0) {
      removeFromCart(productClicked);
    }
    setCartProducts(cartProducts.slice());
    sessionStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }

  const increaseQuantity = (productClicked) => {
    const index = cartProducts.findIndex(element => element.product.id === productClicked.product.id);
    cartProducts[index].quantity++;
    setCartProducts(cartProducts.slice());
    sessionStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }

  const removeFromCart = (productClicked) => {
    const index = cartProducts.findIndex(element => element.product.id === productClicked.product.id);
    cartProducts.splice(index,1);
    setCartProducts(cartProducts.slice());
    sessionStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }

  //{product:{"name":"Men's Watch Mesh","price":6.09}, quantity: 1}
  return (<div>{cartProducts.map(element => 
    <div key={element.id} className="cartProduct">
      <img className="cartProductImg" src={element.product.imgSrc} alt="" />
      <div className="cartProductName">{element.product.name}</div>
      <div className="cartProductPrice">{element.product.price} €</div>
      <div className="cartProductQuantity">
        <img className="cartProductButton" onClick={() => decreaseQuantity(element)} src="/cart/minus.png" alt="" />
        <div>{element.quantity} tk</div>
        <img className="cartProductButton" onClick={() => increaseQuantity(element)} src="/cart/plus.png" alt="" />
      </div>
      <div className="cartProductTotal">{(element.product.price * element.quantity).toFixed(2)} €</div>
      <img className="cartProductButton" onClick={() => removeFromCart(element)} src="/cart/delete.png" alt="" />
    </div>)}</div>)
}

export default Cart;