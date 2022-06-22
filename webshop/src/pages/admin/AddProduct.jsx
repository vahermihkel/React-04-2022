import { useEffect, useRef, useState } from "react";
import FileUpload from "../../components/FileUpload";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [pictureUrl, setPictureUrl] = useState(null); // 1.

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
      imgSrc: pictureUrl, // 2.
      isActive: isActiveRef.current.checked
    }

    fetch(dbUrl, {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json"
      }
    })
  }

  const checkIfIdUnique = () => {
    const index = products.findIndex(element => Number(element.id) === Number(idRef.current.value));
    if (index >= 0) {
      setErrorMessage("Sisestasid teise tootega sama ID!");
    } else {
      setErrorMessage("");
    }
    if (idRef.current.value === "11112222") {
      setErrorMessage("Sisestasid pakiautomaadi ID!");
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
    <select ref={categoryRef}>
      {categories.map(element => <option key={element.id}>{element.name}</option>) }
    </select> <br />
    <label>Pilt</label> <br />
    {/* <input ref={imgSrcRef} type="text" /> <br /> */}
    <FileUpload onSendPictureUrl={setPictureUrl} />
    <label>Aktiivne</label> <br />
    <input ref={isActiveRef} type="checkbox" /> <br />
    <button disabled={errorMessage !== ""} onClick={() => addNewProduct()}>Sisesta uus</button>
  </div>)
}

export default AddProduct;