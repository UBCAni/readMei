import { useState } from "react";

function Input() {
  const [data, setData] = useState(null);
  function getData(val: any) {
    setData(val.target.value);
    console.warn(val.target.value);
  }
  return (
    <div className="Input">
      <h1>readMei</h1>
      <p>{data}</p>
      <input type="text" onChange={getData} />
    </div>
  );
}

export default Input;
