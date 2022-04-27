import { useState } from "react";

function Avaleht() {
  const [s6na, muudaS6na] = useState("50");
  const [numbriline, muudaNumber] = useState(22);
  const [kahendV22rtus, muudaKahendV22rtust] = useState(true);
  const [massiiv, muudaMassiiv] = useState(["Coca cola", 21, true + true]);

  function muudaK6ik() {
    muudaS6na("kolmas sõna");
    muudaNumber(312312);
    muudaKahendV22rtust(false);
  }

  function kustuta(massiiviElement) {
    console.log(massiiv);
    const j2rjekorraNumber = massiiv.indexOf(massiiviElement);
    massiiv.splice(j2rjekorraNumber,1);
    console.log(massiiv);
    muudaMassiiv(massiiv.slice());
    // massiiv.remove(massiiviElement);
    // massiiv.delete(massiiviElement)
  }

  return (
  <div>
    <div>{massiiv.map(element => 
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
 
    {["Toode1","Toode2"].map(toode => <div>{toode}</div>)}
 
 </div>)
}

export default Avaleht;