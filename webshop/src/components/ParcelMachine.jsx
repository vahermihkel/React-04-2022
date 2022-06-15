import { useEffect, useRef, useState } from "react";

function ParcelMachine(props) {
  const [parcelMachines, setParcelMachines] = useState([]);
  const [selectedParcelMachine, setSelectedParcelMachine] = useState(sessionStorage.getItem("parcelMachine"));
  
  const parcelMachineRef = useRef();

  useEffect(() => {
    fetch("https://www.omniva.ee/locations.json")
      .then(res => res.json())
      .then(body => setParcelMachines(body));
  }, [])

  // useImperativeHandle(() => ({
  //   deleteSelectedParcelMachine,
  // }));

  const onChangeParcelMachine = () => {
    setSelectedParcelMachine(parcelMachineRef.current.value);
    const pm = {
      product:
      { id: 11112222, name: "Pakiautomaadi tasu", imgSrc: require("../assets/locker.png"), price: 3.5},
      quantity: 1
    };
    props.products.push(pm);
    props.productsChanged(props.products.slice());
    sessionStorage.setItem("cartProducts", JSON.stringify(props.products));
    sessionStorage.setItem("parcelMachine", parcelMachineRef.current.value);
  }

  const deleteSelectedParcelMachine = () => {
    setSelectedParcelMachine(null);
    // const index = props.products.findIndex(element => element.id === 11112222);
    // ---> const index = -1;   <----- ei leita
    // ---> props.products.splice(-1,1); kustutab viimase
    // props.products.splice(index,1);
    props.products.pop();
    props.productsChanged(props.products.slice());
    sessionStorage.setItem("cartProducts", JSON.stringify(props.products));
    sessionStorage.removeItem("parcelMachine");
  }


  return (<div>  
    { selectedParcelMachine === null && props.products.length > 0 && 
  <select onChange={onChangeParcelMachine} ref={parcelMachineRef}>
    {parcelMachines.filter(element => element.A0_NAME === "EE").map(element => 
      <option key={element.NAME}>{element.NAME}</option>)}
  </select>}
  { selectedParcelMachine !== null && 
    <div>
      {selectedParcelMachine} <button onClick={deleteSelectedParcelMachine}>X</button>
    </div>}
  </div>)
}

export default ParcelMachine;