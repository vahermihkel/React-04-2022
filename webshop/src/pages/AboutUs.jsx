import { useRef } from "react";
import { toast, ToastContainer } from 'react-toastify';

function AboutUs() {
  const starsRef = useRef();
  const nameRef = useRef();
  const textRef = useRef();

  const sendEmail = () => {
    window.Email.send({
        Host : "smtp.elasticemail.com",
        Username : "vahermihkel@gmail.com",
        Password : "D28C04985B0B64A1B3CD2E4FBFBC195F4797",
        To : 'vahermihkel@gmail.com',
        From : "vahermihkel@gmail.com",
        Subject : "Sulle tuli uus tagasiside",
        Body : `Anti ${starsRef.current.value} tärni, 
                nimi: ${nameRef.current.value}, 
                sisu: ${textRef.current.value}`
    }).then(
      // message => alert(message)
      () => toast.success("Edukalt e-mail saadetud")
    );
  }

  return ( <div>
    <label>Tärnid</label> <br />
    <input ref={starsRef} type="range" min="1" max="5"  /> <br />
    <label>Nimi</label> <br />
    <input ref={nameRef} type="text"  /> <br />
    <label>Tagasiside</label> <br />
    <input ref={textRef} type="text" /> <br />
    <button onClick={sendEmail}>Saada e-mail</button>
    <ToastContainer />
  </div> );
}

export default AboutUs;