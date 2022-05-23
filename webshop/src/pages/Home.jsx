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

  // 5. HTML jõutakse ALATI valmis enne kui fetch
  // kui HTML on valmis, siis tagantjärgi muutujate muutumisi ei kontrollita
  return (<div>{products.map(element => <div>{element.name}</div>)}</div>)
}

export default Home;