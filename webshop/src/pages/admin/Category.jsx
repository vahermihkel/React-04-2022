import { useEffect, useRef, useState } from "react";

function Category() {
  const dbUrl = "https://react-05-22-default-rtdb.europe-west1.firebasedatabase.app/categories.json";
  const [categories, setCategories] = useState([]);
  const idRef = useRef();
  const nameRef = useRef();

  useEffect(()=>{
    fetch(dbUrl).then(res => res.json())
      .then(body => {
        const newArray = [];
        for (const key in body) {
          newArray.push(body[key]);
        }
        setCategories(newArray);
      });
  },[]);

  const addNewCategory = () => {
    const category = {
      id: idRef.current.value,
      name: nameRef.current.value
    }

    fetch(dbUrl, {
      method: "POST",
      body: JSON.stringify(category),
      headers: {
        "Content-Type": "application/json"
      }
    })
    categories.push(category);
    setCategories(categories.slice());
  }

  // ID unikaalsuse kontroll
  // Kategooria kustutamine

  return (
  <div>
    <label>Kategooria ID</label> <br />
    <input ref={idRef} type="text" /> <br />
    <label>Kategooria nimi</label> <br />
    <input ref={nameRef} type="text" /> <br />
    {/* <button onClick={() => addNewCategory()}>Sisesta uus kategooria</button> */}
    <button onClick={addNewCategory}>Sisesta uus kategooria</button>
    <div>{categories.map(element => 
      <div key={element.id}>
        <div>{element.name}</div>
      </div>
      )}</div>
  </div>)
}

export default Category;