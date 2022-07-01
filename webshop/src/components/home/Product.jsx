import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { cartSumService } from "../../services/cartSumService";

function Product(props) {
  const { t } = useTranslation();

   /* [{toode:{"category":"wristwatch","isActive":true,"name":"Fashion Sport Men's","price":5.99},kogus: 2},
  {"category":"wristwatch","isActive":true,"name":"Men's Watch Mesh","price":6.09},{"category":"wristwatch","description":"Men's Watch Mesh Belt Business Minimalist Ultra Thin Watches Stainless Steel NEW","id":23672250,"imgSrc":"https://i.ebayimg.com/thumbs/images/g/K5EAAOSwau1hFy8K/s-l225.webp","isActive":true,"name":"Men's Watch Mesh","price":6.09},{"category":"wristwatch","description":"Casio F91W-1 Wrist Watch for Men and women","id":69740208,"imgSrc":"https://i.ebayimg.com/thumbs/images/g/4M8AAOSwdU5iSUBf/s-l225.webp","isActive":true,"name":"Casio F91W-1 Wrist","price":9.85}]
  
  */
 // {"category":"wristwatch","isActive":true,"name":"Men's Watch Mesh","price":6.09}
 // cartProducts = {product:{"name":"Men's Watch Mesh","price":6.09}, quantity: 1}
 const addToCart = (productClicked) => {
  let cartProducts = [];
  if (sessionStorage.getItem("cartProducts")) {
    cartProducts = JSON.parse(sessionStorage.getItem("cartProducts"));
  }
  const index = cartProducts.findIndex(element => element.product.id === productClicked.id);
  if (index >= 0) {
    if (cartProducts[index].quantity >= cartProducts[index].product.stock) {
      toast.error("Vabandame, toodet ei saa rohkem ostukorvi panna!");
      return; 
    } else {
      cartProducts[index].quantity = cartProducts[index].quantity + 1;
    }
  } else {
    const pmIndex = cartProducts.findIndex(element => element.product.id === 11112222);
    const newProduct = {product: productClicked, quantity: 1};
    if (pmIndex >= 0) {
      cartProducts.splice(cartProducts.length-1, 0, newProduct);
    } else {
      cartProducts.push(newProduct);
    }
  }
  sessionStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  toast.success(t("home.cart-successfully"), {
    position: "bottom-right",
    theme: "dark"
  });
  let sumOfCart = 0;
  cartProducts.forEach(element => sumOfCart += element.product.price * element.quantity );
  cartSumService.sendCartSum(sumOfCart);
}

  return (
  <div>
    <img src={props.product.imgSrc} alt="Toote pilt" />
    <div>{props.product.name}</div>
    <div>{props.product.price} €</div>
    <button onClick={() => addToCart(props.product)}>{t('home.add-to-cart-button')}</button>
  </div>)
}

export default Product;