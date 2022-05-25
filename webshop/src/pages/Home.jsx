import { useEffect, useState } from "react";

function Home() {
  // 1. url
  const dbUrl = "https://react-05-22-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  // 2. teeb muutuja valmis ja annab talle väärtuse "üks"
  // let products = "üks";
  const [products, setProducts] = useState([]);

  // 3. läheb andmebaasi päringut tegema, aga ütleb koodile ---> mine edasi (seda teevad fetchid)
  useEffect(()=>{
    fetch(dbUrl).then(res => res.json())
      .then(body => setProducts(body));
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
  }

  // 5. HTML jõutakse ALATI valmis enne kui fetch
  // kui HTML on valmis, siis tagantjärgi muutujate muutumisi ei kontrollita
  return (<div>{products.map(element => 
    <div>
      <div>{element.name}</div>
      <div>{element.price} €</div>
      <button onClick={() => addToCart(element)}>Lisa ostukorvi</button>
    </div>)}</div>)
}

export default Home;