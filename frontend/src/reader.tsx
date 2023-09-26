import { useEffect, useRef, useState } from "react";

function Input() {
  const [data, setData] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("card read complete");
    setData("");
  };

  useEffect(() => {
    const keyDownHandler = (e: { key: string; preventDefault: () => void }) => {
      console.log("User pressed: ", e.key);
      if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit(e);
      } else {
        if (inputRef.current != null) {
          inputRef.current.focus();
        }
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });

  return (
    <div>
      <div className="row g-3">
        <div className="col-sm"></div>
        <div className="col-sm">
          <div className="form-floating">
            <input
              autoFocus
              ref={inputRef}
              type="text"
              id="floatingInput"
              className="form-control hidden-text"
              placeholder="Membership Number"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
            <label htmlFor="floatingInput">Membership Number</label>
          </div>
        </div>
        <div className="col-sm"></div>
      </div>
    </div>
  );
}

export default Input;
