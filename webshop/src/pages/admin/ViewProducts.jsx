import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function ViewProducts() {
  const dbUrl = "https://react-05-22-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  const [products, setProducts] = useState([]); // see mida näitan HTML-s ja muudan koguaeg
  const [originalProducts, setOriginalProducts] = useState([]); // ei näita HTML-s, vaid võtan siit filterduseks
      // ja ei muuda mitte kunagi ehk setOriginalProducts läheb käima VAID andmebaasist võttes

  const { t } = useTranslation();

  useEffect(()=>{
    fetch(dbUrl).then(res => res.json())
      .then(body => {
        const newArray = [];
        for (const key in body) {
          newArray.push(body[key]);
        }
        setProducts(newArray);
        setOriginalProducts(newArray);
      });
  },[]);

  const searchedRef = useRef();

  const searchProducts = () => {
    console.log("funktsioon käivitus");
    // leitud toote  = .find(element => esimene true)        üksiku toote juures ja muutmise juures
    // leitud indeksi  = .findIndex(element => esimene true)        kogustega ostukorv
    //  .map(element => <div>{element}</div>)  ---> toimub asendus     avaleht, ostukorv, tootede vaade
    // 
    // uus massiiv = .filter(element => jätab alles kõik kellel on true)
    const searchedProduct = searchedRef.current.value.toLowerCase();

    const filteredProducts = originalProducts.filter(element => 
            element.name.toLowerCase().indexOf(searchedProduct) >= 0 ||
            element.description.toLowerCase().indexOf(searchedProduct) >= 0 ||
            element.id.toString().indexOf(searchedProduct) >= 0);
    setProducts(filteredProducts);
  }

                  // 12312412    või {id: 12312412, name: "asdasdas"}
  const deleteProduct = (productClicked) => {
    const index = originalProducts.findIndex(element => element.id === productClicked.id);
    originalProducts.splice(index,1);
    fetch(dbUrl, {
      method: "PUT",
      body: JSON.stringify(originalProducts),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => {
      toast.success(t("Edukalt kustutatud"));
      setProducts(originalProducts.slice());
      searchProducts();
    })
  }

  const changeActive = (productClicked) => {
    const index = originalProducts.indexOf(productClicked);
    originalProducts[index].isActive = !originalProducts[index].isActive;
    setProducts(originalProducts.slice());
    searchProducts();
    fetch(dbUrl, {
      method: "PUT",
      body: JSON.stringify(originalProducts),
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
  
  return (<div>
    <input ref={searchedRef} onChange={searchProducts} type="text" />
    <div>{products.length}</div>
    {products.map(element => 
    <div key={element.id} className={`cartProduct ${element.isActive ? "active": "inactive"} `}>
      <div onClick={() => changeActive(element)}>
        <img className="cartProductImg" src={element.imgSrc} alt="Toote pilt" />
        <div>{element.id}</div>
        <div>{element.name}</div>
        <div>{element.description}</div>
        <div>{element.price} €</div>
      </div>
      <button onClick={() => deleteProduct(element)}>X</button>
    </div>)}
    <ToastContainer />
    </div>)
}

export default ViewProducts;