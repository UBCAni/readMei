import React from 'react';
import { useNavigate } from "react-router-dom";
import {RegistrationLogin} from "./registration-login";

function App() {
  const navigate = useNavigate()
  const onclick = (route: string) => {
    navigate(route)
  }
  return (
    RegistrationLogin()
    // navigate("/registration-login")
    // <div className="Input text-center">
    //   <button onClick={() => {
    //     window.location.href = "https://www.ubcani.com/events/info/";
    //   }}>Event Info</button>
    //   <button onClick={() => {onclick("/registration-login")}}>View databases</button>
    //   <button onClick={() => {
    //     window.location.href = "https://ubcani.com/";
    //   }}>UBCANI Website</button>
    // </div>
  );
}

export default App;
