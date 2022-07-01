import { useEffect, useRef, useState } from "react";
import { Pagination } from "react-bootstrap";
import { ToastContainer } from 'react-toastify';
import AdminProduct from "../../components/AdminProduct";

function ViewProducts() {
  const dbUrl = "https://react-05-22-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  const [products, setProducts] = useState([]); // see mida näitan HTML-s ja muudan koguaeg
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]); // ei näita HTML-s, vaid võtan siit filterduseks
  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState([]);
  const searchedRef = useRef();

  useEffect(()=>{
    fetch(dbUrl).then(res => res.json())
      .then(body => {
        const newArray = [];
        let i = 0;
        let pagesArray = [];
        for (const key in body) {
          newArray.push(body[key]);
          if (i%10 === 0) {
            pagesArray.push(i/10+1);
          }
          i++;
        }
        setPages(pagesArray);
        setProducts(newArray.slice(0,10));
        setFilteredProducts(newArray);
        setOriginalProducts(newArray);
      });
  },[]);

  const searchProducts = (origin) => {
    const searchedProduct = searchedRef.current.value.toLowerCase();
    const filteredProductsArray = originalProducts.filter(element => 
            element.name.toLowerCase().indexOf(searchedProduct) >= 0 ||
            element.description.toLowerCase().indexOf(searchedProduct) >= 0 ||
            element.id.toString().indexOf(searchedProduct) >= 0);
    setProducts(filteredProductsArray);
    setFilteredProducts(filteredProductsArray);

    if (origin === 'update') {
      selectPage(activePage, filteredProductsArray);
    } else {
      selectPage(1, filteredProductsArray);
    }
    
    let pagesArray = [];
    for (let number = 0; number <= filteredProductsArray.length; number++) {
      if (number%10 === 0) {
        pagesArray.push(number/10+1);
      }
    }
    setPages(pagesArray);
  }

  const sendProductsToDB = () => {
    fetch(dbUrl, {
      method: "PUT",
      body: JSON.stringify(originalProducts),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => {
      setProducts(originalProducts.slice());
      searchProducts('update');
    })
  }

  const selectPage = (number, filtered) => {
    setActivePage(number);
    if (searchedRef.current.value !== "") { // kui vajutatakse [1,2,3,4,5] nii et otsingus
      const searchedProduct = searchedRef.current.value.toLowerCase();
      const filteredProducts = originalProducts.filter(element => 
              element.name.toLowerCase().indexOf(searchedProduct) >= 0 ||
              element.description.toLowerCase().indexOf(searchedProduct) >= 0 ||
              element.id.toString().indexOf(searchedProduct) >= 0);
      setProducts(filteredProducts.slice((number-1)*10, number*10));
    } else if (filtered === undefined) { // kui vajutatakse [1,2,3,4,5] peale
      setProducts(originalProducts.slice((number-1)*10, number*10));
    } else {
      setProducts(filtered.slice((number-1)*10, number*10)); // kui otsitakse
    }
  }
  
  return (
  <div>
    <input ref={searchedRef} onChange={searchProducts} type="text" />
    <div>{filteredProducts.length}</div>
    {products.map(element => 
      <AdminProduct 
        element={element} 
        originalProducts={originalProducts}
        updateProducts={sendProductsToDB} />
    )}
    <ToastContainer />
    {products.length > 1 && 
      <Pagination>
        {pages.map(number => 
          <Pagination.Item onClick={() => selectPage(number)} key={number} active={number === activePage}>
          {number}
        </Pagination.Item>
        )}
      </Pagination>}
  </div>)
}

export default ViewProducts;