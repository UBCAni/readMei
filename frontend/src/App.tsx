import React from 'react';
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate()
  const onclick = (route: string) => {
    navigate(route)
  }
  return (
    <div className="Input text-center">
      <button onClick={() => {}}>Register for Events</button>
      <button onClick={() => {}}>Event Info</button>
      <button onClick={() => {onclick("/registration-login")}}>Exec and Volunteer Login</button>
      <button onClick={() => {}}>UBCANI Website</button>
    </div>
  );
}

export default App;
