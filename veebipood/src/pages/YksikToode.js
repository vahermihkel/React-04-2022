import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function YksikToode() {
  // 1. võtta URLst toote nimi   coca-cola-2l
  // 2. võtta kõik tooted LocalStorage-st
  // 3. otsida kõikide toodete seast selle nime alusel õige toode üles
  // 4. kuvada see toode HTML-s
  const { nimi } = useParams();  // peab olema täpselt sama mis App.js --->  :nimi

  // const tooted = JSON.parse(localStorage.getItem("tooted"));  // võti peab ühtima
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
                                                                            // URLst = "coca-cola"
// LocalStorage-st ---> [{nimi: 'Sprite', hind: '13', aktiivne: true}, {nimi: 'Coca cola', hind: '13', aktiivne: true}, {nimi: 'Coca cola', hind: '2', aktiivne: true}]
                //{nimi: 'Sprite', hind: '13', aktiivne: true} =>
                //      "sprite" === "coca-cola"   false
                //{nimi: 'Coca cola', hind: '13', aktiivne: true} =>
                //      "coca-cola" === "coca-cola"  true
                //{nimi: 'Coca cola', hind: '2', aktiivne: true} SIIA EI LÄHE
  const toode = tooted.find(element => 
    element.nimi.toLowerCase().replaceAll(" ", "-").replaceAll("õ", "o") === nimi);

  return (
    <div>
     { toode && <div>
        <div>{toode.nimi}</div>
        <div>{toode.hind}</div>
      </div>}
    </div>)
}

export default YksikToode;

// MAKSMINE   EveryPay keskkonda API päringuid
// MUUTMINE   useRef()    kui ka useParams()
// ANDMEBAAS  Firebase

// tõlked
// Bootstrap külge
// ANDMEBAAS
// Ostukorv, aga kogustega [{1},{2},{2}]
//[{toode:{1}, kogus: 1},{toode:{2}, kogus: 2}]