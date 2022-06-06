import { useEffect, useRef, useState } from "react";

function AddProduct() {
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const imgSrcRef = useRef();
  const isActiveRef = useRef();
  const dbUrl = "https://react-05-22-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  const [products, setProducts] = useState([]);
  const categoriesDbUrl = "https://react-05-22-default-rtdb.europe-west1.firebasedatabase.app/categories.json";
  const [categories, setCategories] = useState([]);

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

  useEffect(()=>{
    fetch(categoriesDbUrl).then(res => res.json())
      .then(body => {
        const newArray = [];
        for (const key in body) {
          newArray.push(body[key]);
        }
        setCategories(newArray);
      });
  },[]);

  const addNewProduct = () => {
    const product = {
      id: idRef.current.value,
      name: nameRef.current.value,
      price: priceRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
      imgSrc: imgSrcRef.current.value,
      isActive: isActiveRef.current.value
    }

    fetch(dbUrl, {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json"
      }
    })
  }

  const [errorMessage, setErrorMessage] = useState("");

  const checkIfIdUnique = () => {
    const index = products.findIndex(element => Number(element.id) === Number(idRef.current.value));
    console.log(idRef.current.value);
    console.log(index);
    if (index >= 0) {
      setErrorMessage("Sisestasid teise tootega sama ID!");
    } else {
      setErrorMessage("");
    }
  }

  return (<div>
    <div>{errorMessage}</div>
    <label>ID</label> <br />
    <input onChange={checkIfIdUnique} ref={idRef} type="number" /> <br />
    <label>Nimi</label> <br />
    <input ref={nameRef} type="text" /> <br />
    <label>Hind</label> <br />
    <input ref={priceRef} type="number" /> <br />
    <label>Kirjeldus</label> <br />
    <input ref={descriptionRef} type="text" /> <br />
    <label>Kategooria</label> <br />
    {/* <input ref={categoryRef} type="text" /> <br /> */}
    <select ref={categoryRef}>
      {categories.map(element => <option>{element.name}</option>) }
    </select> <br />
    <label>Pilt</label> <br />
    <input ref={imgSrcRef} type="text" /> <br />
    <label>Aktiivne</label> <br />
    <input ref={isActiveRef} type="checkbox" /> <br />
    <button disabled={errorMessage !== ""} onClick={() => addNewProduct()}>Sisesta uus</button>
  </div>)
}

export default AddProduct;