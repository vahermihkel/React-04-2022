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

  const maksma = () => {
    const makseAndmed = {
      "api_username": "92ddcfab96e34a5f",
      "account_name": "EUR3D1",
      "amount": arvutakogusumma(),
      "order_reference": Math.random() * 999999,
      "nonce": "a9b7fjkadsaasd132167b9902" + Math.random() * 999999 + new Date(),
      "timestamp": new Date(),
      "customer_url": "https://react-04-2022.web.app"
      }
    const headers = {
      "Authorization": "Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA==",
      "Content-Type": "application/json"
    }
    fetch("https://igw-demo.every-pay.com/api/v4/payments/oneoff",{
      "method": "POST",
      "body": JSON.stringify(makseAndmed),
      "headers": headers
    }).then(res => res.json())
      .then(body => window.location.href = body.payment_link);
  }

  const tyhjenda = () => {
    muudaOstukorvi([]);
    sessionStorage.setItem("ostukorviTooted", JSON.stringify([]));
  }

  return (
    <div>
      { ostukorviTooted.length > 0 && <div>Ostukorvis on {ostukorviTooted.length} toodet</div>}
      {ostukorviTooted.map(element => 
      <div>
        {element.nimi} ({element.hind} €)
        <button onClick={() => kustuta(element)}>X</button>
        <button onClick={() => lisaOstukorvi(element)}>+</button>
      </div>   
    )}
    { ostukorviTooted.length > 0 && 
      <button onClick={() => tyhjenda()}>Tühjenda</button>}
    <br /><br />
    { ostukorviTooted.length > 0 && <div>{ arvutakogusumma() } €</div>}
    { ostukorviTooted.length > 0 && <button onClick={() => maksma()}>Maksma</button>}
    { ostukorviTooted.length === 0 && <div>Ostukorv on tühi</div>}
    </div>
  )
}

export default Ostukorv;

// uue projekt - inglise keelne
// 1. õiged lehed valmis
// 2. seosed nendele lehtedele
// 3. react-bootstrap
// 4. tõlked  react i18next
//??
// 5. Ebay'st 200 toodet (script e-mailile)
// 6. Võtame kasutusele need avalehel
// 7. 