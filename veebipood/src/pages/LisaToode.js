import { useRef } from "react";

function LisaToode() {
  const nimiRef = useRef(); // Reacti erikood (hook), mis võimaldab väärtusi lugeda inputi sees
  const hindRef = useRef(); // mõttekus tekib siis kui on input küljes ja kuskil mingil hetkel
  const aktiivneRef = useRef(); // loeme mis inputi sisse sisestati

  function lisaUusToode() {
    //   <input id="nimi" type="text" /> <br />
    //   document.getElementById("nimi").value
    console.log(nimiRef.current.value);
    console.log(hindRef.current.value);
    console.log(aktiivneRef.current.checked);
    let tooted = [];
    if (localStorage.getItem("tooted") !== null) {
      tooted = JSON.parse(localStorage.getItem("tooted")); // "[{nimi: "Coca-cola", 2, true}]"
    } 
    const uusToode = {
      nimi: nimiRef.current.value, // nimi: "Coca-cola"
      hind: hindRef.current.value,
      aktiivne: aktiivneRef.current.checked
    }
    tooted.push(uusToode);
                  //      1 võti         "[{nimi: "Coca-cola", 2, true}]"
    localStorage.setItem("tooted", JSON.stringify(tooted));
  }

  return (
    <div>
      <label>Nimi</label> <br />
      <input ref={nimiRef} type="text" /> <br />
      <label>Hind</label> <br />
      <input ref={hindRef} type="number" /> <br />
      <label>Aktiivne</label> <br />
      <input ref={aktiivneRef} type="checkbox" /> <br />
      <button onClick={() => lisaUusToode()}>SISESTA</button>
      {/* <input type="checkbox"></input>
      <img src=""></img>
      <br></br> */}
    </div>)
}

export default LisaToode;