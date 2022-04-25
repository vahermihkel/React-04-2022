import { useState } from "react";

function Avaleht() {
  const [s6na, muudaS6na] = useState("50");
  const [numbriline, muudaNumber] = useState(22);
  const [kahendV22rtus, muudaKahendV22rtust] = useState(true);

  // const muudaK6ik = () => {

  // }

  function muudaK6ik() {
    muudaS6na("kolmas sõna");
    muudaNumber(312312);
    muudaKahendV22rtust(false);
  }

  return (
  <div>
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
 </div>)
}

export default Avaleht;