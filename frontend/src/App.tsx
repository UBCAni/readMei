import React from 'react';
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate()
  const onclick = (route: string) => {
    navigate(route)
  }
  return (
    <div className="Input text-center">
      <button onClick={() => {
        window.location.href = "https://www.ubcani.com/events/info/";
      }}>Event Info</button>
      <button onClick={() => {onclick("/registration-login")}}>View databases</button>
      <button onClick={() => {
        window.location.href = "https://ubcani.com/";
      }}>UBCANI Website</button>
    </div>
  );
}

export default App;
