import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import Spinner from "../components/home/Spinner";
import SortButtons from "../components/home/SortButtons";
import FilterBar from "../components/home/FilterBar";
import Product from "../components/home/Product";
import CarouselGallery from "../components/home/CarouselGallery";

function Home() {
  // 1. url
  const dbUrl = "https://react-05-22-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  // 2. teeb muutuja valmis ja annab talle väärtuse "üks"
  // let products = "üks";
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);

  // 3. läheb andmebaasi päringut tegema, aga ütleb koodile ---> mine edasi (seda teevad fetchid)
  useEffect(()=>{
    fetch(dbUrl).then(res => res.json())
      .then(body => {
        let newArray = [];
        for (const key in body) {
          const product = body[key];
          if (product.isActive && product.stock > 0) {
            newArray.push(body[key]);
          }
        }
        setProducts(newArray);
        setOriginalProducts(newArray);
        const catFromProducts = newArray.map(element => element.category);
        setCategories([...new Set(catFromProducts)]);
        setLoading(false);
      });
  },[]);

  //Array [5].push(), .splice(), .indexOf()
  // [5].forEach(e => sum = sum+hind ) teeb .length (5) korda, korrutab funktsiooni ---> void
  // [5].find(e => true?? )  teeb nii mitu korda kuni esimese true-ni, ---> 1 elemendi ::> {}
  // [5].findIndex(e => true?? )  teeb nii mitu korda kuni esimese true-ni, ---> elemendi indexi ::> 2
  // [5].sort((a,b) => a.hind-b.hind )  teeb kuni sorteeritud ---> void
  // [5].filter(e => true )  teeb .length (5) korda   ---> tagastab kõik kellel on true ::> [{},{}]
  // [5].map(e => e.hind )  teeb .length (5) korda   ---> tagastab uuendatud kujul ::> ["","","","",""]
  
  // 4. annab muutujale uue väärtuse "kolm"
  // products = "kolm";

  // 5. HTML jõutakse ALATI valmis enne kui fetch
  // kui HTML on valmis, siis tagantjärgi muutujate muutumisi ei kontrollita
  return (<div>
    <CarouselGallery />
    { categories.length > 1 && <FilterBar
      originalProducts={originalProducts}
      setProducts={setProducts}
      categories={categories}
    />}
    { products.length }
    <SortButtons products={products} setProducts={setProducts} />
    <br />
    {isLoading && <Spinner />}
    {products.map(e => 
      <Product key={e.id} product={e} />
    )}
    <ToastContainer />
    </div>)
}

export default Home;