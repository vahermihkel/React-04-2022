import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Avaleht() {
  // const [s6na, muudaS6na] = useState("50");
  // const [numbriline, muudaNumber] = useState(22);
  // const [kahendV22rtus, muudaKahendV22rtust] = useState(true);
  const [tooted, muudaTooted] = useState([]);

  useEffect(()=>{ 
    fetch("https://react-04-2022-default-rtdb.europe-west1.firebasedatabase.app/tooted.json")
      .then(res => res.json())
      .then(object => {
        const uusMassiiv = [];
        
        for (const key in object) {
          uusMassiiv.push(object[key]);
        }

        muudaTooted(uusMassiiv);
      })
    },[])
 
  // function v6taLocalStoragest() {
  //   if (localStorage.getItem("tooted") === null) { // null on tühjus    // undefined
  //     return [];
  //   } else {
  //   [{"aktiivne": true, "hind": "3","nimi": "Vitamin well"},{"aktiivne": true, "hind": "3","nimi": "Vitamin well"} ]
  //     //console.log(typeof localStorage.getItem("avaleheMassiiv")); // STRING
  //     //console.log(typeof JSON.parse(localStorage.getItem("avaleheMassiiv"))); // MASSIIV
  //     return JSON.parse(localStorage.getItem("tooted")); // peab olema massiiv
  //   }
  // }

  // function muudaK6ik() {
  //   muudaS6na("kolmas sõna");
  //   muudaNumber(312312);
  //   muudaKahendV22rtust(false);
  // }

  // function kustuta(massiiviElement) {
  //   console.log(massiiv);
  //   const j2rjekorraNumber = massiiv.indexOf(massiiviElement);
  //   massiiv.splice(j2rjekorraNumber,1);
  //   console.log(massiiv);
  //   muudaMassiiv(massiiv.slice());
  //   // massiiv.remove(massiiviElement);
  //   // massiiv.delete(massiiviElement)
  //   localStorage.setItem("avaleheMassiiv", JSON.stringify(massiiv));
  // }

  function lisaOstukorvi(toode) {
    console.log(toode); // {nimi: 'asd', hind: '123123', aktiivne: true}
    let ostukorviTooted = [];
    if (sessionStorage.getItem("ostukorviTooted") !== null) {
      // "[{nimi: 'asd', hind: '123123', aktiivne: true}]"  -->  JSON.parse()  --->
      //    [{nimi: 'asd', hind: '123123', aktiivne: true}]
      ostukorviTooted = JSON.parse(sessionStorage.getItem("ostukorviTooted"));
    }
    ostukorviTooted.push(toode);
   // [{nimi: 'asd', hind: '123123', aktiivne: true}, {nimi: 'asd', hind: '123123', aktiivne: true}]
      // JSON.stringify ---> "[{1},{2}]"
      // key                |     value
      // ostukorviTooted        [{1},{2}]
    sessionStorage.setItem("ostukorviTooted", JSON.stringify(ostukorviTooted));
  }

  return (
  <div>
    <div>{tooted.map(element => 
      <div key={element.nimi}>
        <Link to={"/toode/" + element.nimi.toLowerCase().replaceAll(" ", "-").replaceAll("õ", "o")}>
          <div>{element.nimi}</div>
          <div>{element.hind}</div>
        </Link>
        <button onClick={() => lisaOstukorvi(element)}>Lisa {element.nimi} ostukorvi</button>
        <Link to={"/muuda/" + element.nimi.toLowerCase().replaceAll(" ", "-").replaceAll("õ", "o")}>
          <button>Muuda toodet</button>
        </Link>
      </div>
            )}</div>
 </div>)
}

export default Avaleht;


    /* <div>{massiiv.map(element => 
      <div>
        {element}<button onClick={() => kustuta(element)}>x</button>
      </div>)}
    </div>
    <button onClick={() => muudaMassiiv(["üks", "kaks"])}>Muuda massiivi</button>
    <br /> <br />
    <div>{ s6na }</div>
    <div>{ numbriline }</div>
    <div>{ kahendV22rtus.toString() }</div>
    <div>{ numbriline + numbriline }</div>
    <div>{ kahendV22rtus + kahendV22rtus }</div>
    <div>{ s6na + s6na }</div>
    { kahendV22rtus && <div>Vahepeal näitan seda, vahepeal ei näita</div>}
    <button onClick={() => muudaK6ik()}>Muuda kõik</button>
    <button onClick={() => muudaS6na("uus sõna")}>Anna sõnale uus väärtus</button>
    <button onClick={() => muudaKahendV22rtust(!kahendV22rtus)}>Muuda kahendväärtust</button>
 
    {["Toode1","Toode2"].map(toode => <div>{toode}</div>)} */