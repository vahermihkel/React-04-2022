import { useState } from "react";
import ParcelMachine from "../components/ParcelMachine";
import "../css/Cart.css";

function Cart() {
  const [cartProducts, setCartProducts] = useState(
    JSON.parse(sessionStorage.getItem("cartProducts")) || []
  );
  // const parcelMachineHandleRef = useRef();

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
    if (cartProducts.length === 1 && cartProducts[0].product.id === 11112222) {
      cartProducts.pop();
      // parcelMachineHandleRef.current.deleteSelectedParcelMachine();
    }
    setCartProducts(cartProducts.slice());
    sessionStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }

  const calculateSumOfCart = () => {
    let sumOfCart = 0;
    cartProducts.forEach(element => sumOfCart += element.product.price * element.quantity );
    return sumOfCart;
  }

  //{product:{"name":"Men's Watch Mesh","price":6.09}, quantity: 1}
  return (<div>
    <button>TÜHJENDA --- KODUS</button>
    {cartProducts.map(element => 
    <div key={element.product.id} className="cartProduct">
      <img className="cartProductImg" src={element.product.imgSrc} alt="" />
      <div className="cartProductName">{element.product.name}</div>
      <div className="cartProductPrice">{element.product.price} €</div>
      <div className="cartProductQuantity">
        { element.product.id !== 11112222 && <img className="cartProductButton" onClick={() => decreaseQuantity(element)} src="/cart/minus.png" alt="" />}
        <div>{element.quantity} tk</div>
        { element.product.id !== 11112222 && <img className="cartProductButton" onClick={() => increaseQuantity(element)} src="/cart/plus.png" alt="" />}
      </div>
      <div className="cartProductTotal">{(element.product.price * element.quantity).toFixed(2)} €</div>
      { element.product.id !== 11112222 && <img className="cartProductButton" onClick={() => removeFromCart(element)} src="/cart/delete.png" alt="" />}
    </div>)}

    { cartProducts.length === 0 && <div>Ostukorv on tühi</div>}
    { cartProducts.length > 0 && <div>Kokku: {calculateSumOfCart().toFixed(2)}</div>}


    <ParcelMachine products={cartProducts} productsChanged={setCartProducts} />
    <br /><br /><br />
    </div>)
}

export default Cart;