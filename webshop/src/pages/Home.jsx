import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Spinner from "../components/Spinner";
import SortButtons from "../components/SortButtons";

function Home() {
  // 1. url
  const dbUrl = "https://react-05-22-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  // 2. teeb muutuja valmis ja annab talle väärtuse "üks"
  // let products = "üks";
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [categories, setCategories] = useState([]);
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
        setOriginalProducts(newArray);
        const catFromProducts = newArray.map(element => element.category);
        setCategories([...new Set(catFromProducts)]);
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
  }

  const [selectedCategory, setSelectedCategory] = useState('all');

  const productsByCat = (category) => {
    if (category === 'all') {
      setProducts(originalProducts);
      setSelectedCategory('all');
    } else {
      const newProducts = originalProducts.filter(element => element.category === category);
      setProducts(newProducts);
      setSelectedCategory(category);
    }
  }

  // 5. HTML jõutakse ALATI valmis enne kui fetch
  // kui HTML on valmis, siis tagantjärgi muutujate muutumisi ei kontrollita
  return (<div>
    <div className={selectedCategory === "all" ? "selected" : undefined} onClick={() => productsByCat('all')}>
      Kõik kategooriad
    </div>
    { categories.map(element => <div className={selectedCategory === element ? "selected" : undefined} 
        onClick={() => productsByCat(element)} key={element}>{element}</div>) }
    <SortButtons products={products} setProducts={setProducts} />
    <br />
    {products.length === 0 && <Spinner />}
    {products.map(element => 
    <div key={element.id}>
      <img src={element.imgSrc} alt="Toote pilt" />
      <div>{element.name}</div>
      <div>{element.price} €</div>
      <button onClick={() => addToCart(element)}>{t('home.add-to-cart-button')}</button>
    </div>)}
    <ToastContainer />
    </div>)
}

export default Home;