import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function Home() {
  // 1. url
  const dbUrl = "https://react-05-22-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  // 2. teeb muutuja valmis ja annab talle väärtuse "üks"
  // let products = "üks";
  const [products, setProducts] = useState([]);
  const { t } = useTranslation();

  // 3. läheb andmebaasi päringut tegema, aga ütleb koodile ---> mine edasi (seda teevad fetchid)
  useEffect(()=>{
    fetch(dbUrl).then(res => res.json())
      .then(body => {
        const newArray = [];
        for (const key in body) {
          newArray.push(body[key]);
        }
        setProducts(newArray);
      });
  },[]);
  
  // 4. annab muutujale uue väärtuse "kolm"
  // products = "kolm";

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
      cartProducts[index].quantity = cartProducts[index].quantity + 1;
    } else {
      cartProducts.push({product: productClicked, quantity: 1});
    }
    sessionStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    toast.success(t("home.cart-successfully"), {
      position: "bottom-right",
      theme: "dark"
    });
  }

  const sortAZ = () => {
    products.sort((a,b) => a.name.localeCompare(b.name));
    setProducts(products.slice());
  }

  const sortZA = () => {
    products.sort((a,b) => b.name.localeCompare(a.name));
    setProducts(products.slice());
  }

  const sortPriceAsc = () => {
    products.sort((a,b) => a.price - b.price);
    setProducts(products.slice());
  }

  const sortPriceDesc = () => {
    products.sort((a,b) => b.price - a.price);
    setProducts(products.slice());
  }

  // 5. HTML jõutakse ALATI valmis enne kui fetch
  // kui HTML on valmis, siis tagantjärgi muutujate muutumisi ei kontrollita
  return (<div>
    <button onClick={() => sortAZ()}>{t('home.sortAZ')}</button>
    <button onClick={() => sortZA()}>Sorteeri Z-A</button>
    <button onClick={() => sortPriceAsc()}>Hind kasvavalt</button>
    <button onClick={() => sortPriceDesc()}>Hind kahanevalt</button>
    {products.map(element => 
    <div>
      <img src={element.imgSrc} alt="Toote pilt" />
      <div>{element.name}</div>
      <div>{element.price} €</div>
      <button onClick={() => addToCart(element)}>{t('home.add-to-cart-button')}</button>
    </div>)}
    <ToastContainer />
    </div>)
}

export default Home;