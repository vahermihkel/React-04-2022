import { useEffect, useRef, useState } from "react";
import { Button, Modal, Pagination } from "react-bootstrap";
import { ToastContainer } from 'react-toastify';
import AdminProduct from "../../components/AdminProduct";

function ViewProducts() {
  const dbUrl = "https://react-05-22-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  const [products, setProducts] = useState([]); // see mida näitan HTML-s ja muudan koguaeg
  const [originalProducts, setOriginalProducts] = useState([]); // ei näita HTML-s, vaid võtan siit filterduseks
      // ja ei muuda mitte kunagi ehk setOriginalProducts läheb käima VAID andmebaasist võttes
  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState([]);
  // for (let number = 1; number <= 5; number++) {
  //   pages.push(number);
  // }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    selectPage(1, filteredProducts);
    let pagesArray = [];
    for (let number = 0; number <= filteredProducts.length; number++) {
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
      searchProducts();
    })
  }

  const selectPage = (number, filtered) => {
    setActivePage(number);
                                  //        1   ---> 0,10
                                  //        2   ---> 10,20
                                  //        3   ---> 20,30
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


  // if (filteredProducts === undefined && searchedRef.current.value !== undefined) {
  //   searchProducts();
  //   console.log("läksin siia 1");
  // } else if (filteredProducts === undefined) {
  //   setProducts(originalProducts.slice((number-1)*10, number*10));
  //   console.log("läksin siia 2");
  // } else if (filteredProducts !== undefined && searchedRef.current.value !== undefined) {
  //   setProducts(filteredProducts.slice((number-1)*10, number*10));
  //   console.log("läksin siia 3");
  // }
  
  return (
  <div>
    <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    <input ref={searchedRef} onChange={searchProducts} type="text" />
    <div>{products.length}</div>
    {products.map(element => 
      <AdminProduct 
        element={element} 
        originalProducts={originalProducts}
        updateProducts={sendProductsToDB} />
    )}
    <ToastContainer />
    {products.length > 0 && 
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