import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

function MuudaToode() {
  const { toodeNimi } = useParams();

  console.log(toodeNimi);

  // assignment to constant variable
  const tooted = JSON.parse(localStorage.getItem("tooted")); 

  console.log(tooted);

  const muudetavToode = tooted.find(element => 
    element.nimi.toLowerCase().replaceAll(" ", "-").replaceAll("õ", "o") === toodeNimi);
  const muudetavaTooteIndex = tooted.indexOf(muudetavToode);

  console.log(muudetavToode);

  const nimiRef = useRef();
  const hindRef = useRef();
  const aktiivneRef = useRef();
  const navigate = useNavigate();

  const muudaToodet = () => {
    const uusToode = {
      nimi: nimiRef.current.value,
      hind: hindRef.current.value,
      aktiivne: aktiivneRef.current.checked
    }
    tooted[muudetavaTooteIndex] = uusToode;
    console.log(uusToode);
    localStorage.setItem("tooted", JSON.stringify(tooted));
    navigate("/");
  }

  // tumesinised - const, function, class, interface, HTMLs täägid; tähistab JS liiki
  // keskmised sinised - const muutujad
  // helesinised - üldised muutujad, võtmed, HTML atribuudid
  // kollased - funktsioonid
  // oranž - jutumärkides väärtus
  // lillad - import, export, return

 return (
  <div>
      <label>Nimi</label> <br />
      <input ref={nimiRef} defaultValue={muudetavToode.nimi} type="text" /> <br />
      <label>Hind</label> <br />
      <input ref={hindRef} defaultValue={muudetavToode.hind} type="number" /> <br />
      <label>Aktiivne</label> <br />
      <input ref={aktiivneRef} defaultChecked={muudetavToode.aktiivne} type="checkbox" /> <br />
      <button onClick={() => muudaToodet()}>Muuda</button>
  </div>)
}

export default MuudaToode;