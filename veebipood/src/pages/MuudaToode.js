import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function MuudaToode() {
  const { toodeNimi } = useParams();

  console.log(toodeNimi);

  // assignment to constant variable
  // const tooted = JSON.parse(localStorage.getItem("tooted")); 
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
    // localStorage.setItem("tooted", JSON.stringify(tooted));

    fetch("https://react-04-2022-default-rtdb.europe-west1.firebasedatabase.app/tooted.json",{
      method: "PUT", // POST -> PUT (mitte lisa, vaid asenda KÕIK)
      body: JSON.stringify(tooted), // uusToode -> tooted (mitte üks toode vaid KÕIK tooted)
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => navigate("/"));
    console.log("SIIA JÕUAB ENNE KUI TÄIELIKULT PÄRING VALMIS");
  }

  // tumesinised - const, function, class, interface, HTMLs täägid; tähistab JS liiki
  // keskmised sinised - const muutujad
  // helesinised - üldised muutujad, võtmed, HTML atribuudid
  // kollased - funktsioonid
  // oranž - jutumärkides väärtus
  // lillad - import, export, return

 return (
  <div>
      { muudetavToode !== undefined && <div>
        <label>Nimi</label> <br />
        <input ref={nimiRef} defaultValue={muudetavToode.nimi} type="text" /> <br />
        <label>Hind</label> <br />
        <input ref={hindRef} defaultValue={muudetavToode.hind} type="number" /> <br />
        <label>Aktiivne</label> <br />
        <input ref={aktiivneRef} defaultChecked={muudetavToode.aktiivne} type="checkbox" /> <br />
        <button onClick={() => muudaToodet()}>Muuda</button>
      </div>}
  </div>)
}

export default MuudaToode;