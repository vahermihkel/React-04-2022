import { useEffect, useRef, useState } from "react";

function ParcelMachine(props) {
  const [parcelMachines, setParcelMachines] = useState([]);
  const [selectedParcelMachine, setSelectedParcelMachine] = useState(sessionStorage.getItem("parcelMachine"));

  // klikivajutusega kutsun välja funktsiooni, mis paneb valitud pakiautomaadile väärtuse
  // valitus pakiautomaadi näitan välja
  // { selectedParcelMachine &&  siis näita mingit div-i, mis on VALITUD
  // X ---> pane tagasi tühjus valitud pakiautomaadi kohale
  // { !selectedParcelMachine && <select>  }

  useEffect(() => {
    fetch("https://www.omniva.ee/locations.json")
      .then(res => res.json())
      .then(body => setParcelMachines(body));
  }, [])

  const onChangeParcelMachine = () => {
    setSelectedParcelMachine(parcelMachineRef.current.value);
    props.products.push({product:{id: 11112222, name: "Pakiautomaadi tasu", imgSrc: require("../assets/locker.png"), price: 3.5}, quantity: 1});
    props.productsChanged(props.products.slice());
    sessionStorage.setItem("cartProducts", JSON.stringify(props.products));
    sessionStorage.setItem("parcelMachine", parcelMachineRef.current.value);
  }

  const parcelMachineRef = useRef();

  const deleteSelectedParcelMachine = () => {
    setSelectedParcelMachine(null);
    const index = props.products.findIndex(element => element.id === 11112222);
    props.products.splice(index,1);
    props.productsChanged(props.products.slice());
    sessionStorage.setItem("cartProducts", JSON.stringify(props.products));
    sessionStorage.removeItem("parcelMachine");
  }


  return (<div>  
    { selectedParcelMachine === null && <select onChange={onChangeParcelMachine} ref={parcelMachineRef}>
    {parcelMachines.filter(element => element.A0_NAME === "EE").map(element => <option>{element.NAME}</option>)}
  </select>}
  { selectedParcelMachine !== null && <div>{selectedParcelMachine} <button onClick={deleteSelectedParcelMachine}>X</button></div>}
  </div>)
}

export default ParcelMachine;