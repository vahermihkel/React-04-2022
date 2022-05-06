import { useState } from "react";

// 1. Andmebaas - Firebase
// 2. Brauserisse - localStorage/sessionStorage -
// parem klõps -> inspect -> application (chrome)

function Ostukorv() {
  const [ostukorviTooted, muudaOstukorvi] = useState(v6taSessionStoragest());

  function v6taSessionStoragest() {
    if (sessionStorage.getItem("ostukorviTooted") !== null) {
      return JSON.parse(sessionStorage.getItem("ostukorviTooted"));
    } else {
      return [];
    }
  }

  function kustuta(massiiviElement) {
    const j2rjekorraNumber = ostukorviTooted.indexOf(massiiviElement);
    ostukorviTooted.splice(j2rjekorraNumber,1);
    muudaOstukorvi(ostukorviTooted.slice());
    sessionStorage.setItem("ostukorviTooted", JSON.stringify(ostukorviTooted));
  }

  function lisaOstukorvi(toode) {
    ostukorviTooted.push(toode);
    muudaOstukorvi(ostukorviTooted.slice());
    sessionStorage.setItem("ostukorviTooted", JSON.stringify(ostukorviTooted));
  }

  function arvutakogusumma() {
    let kogusumma = 0;
    // [{n: "c", h: 12},{n: "f", h: 1},{n: "s", h: 44}].forEach()
    //.forEach({n: "c", h: 12} =>  12  =  0 + 12 )
    //.forEach({n: "f", h: 1} =>   13  =  12 + 1 )
    //.forEach(n: "s", h: 44} =>   57  =  13 + 44 )
    ostukorviTooted.forEach(element => kogusumma = kogusumma + Number(element.hind));
    return kogusumma;
  }

  return (
    <div>
      <div>Ostukorvis on {ostukorviTooted.length} toodet</div>
      {ostukorviTooted.map(element => 
      <div>
        {element.nimi} ({element.hind} €)
        <button onClick={() => kustuta(element)}>X</button>
        <button onClick={() => lisaOstukorvi(element)}>+</button>
      </div>   
    )}
    { ostukorviTooted.length > 0 && 
      <button onClick={() => muudaOstukorvi([])}>Tühjenda</button>}
    <br /><br />
    <div>{ arvutakogusumma() } €</div>
    </div>
  )
}

export default Ostukorv;