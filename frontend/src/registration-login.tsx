import { useState, useEffect  } from 'react';
import { LoginState, authenticateUser } from './get-member/components/index/login';
import { useNavigate } from "react-router-dom";

export function RegistrationLogin() {
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState<string>('');
  const [pwValue, setPwValue] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [setShowAlert]); 

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  };

  const handlePwChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPwValue(event.target.value);
  };
  
  const changeAlert = (state: LoginState) => {
    setAlertMessage(state.message);
    setShowAlert(true);
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // console.log("working");
    let authenticator: Promise<LoginState> = authenticateUser(emailValue, pwValue);
    authenticator.then((result) => {
      if (result.authenticated) {
        navigate("/home-page");
      } else {
        // show pop-up describing reason why login has failed using LoginState.message
        changeAlert(result);
      }
    });

  };
  return (
    <>
      <div className="Input text-center">
      <h1 className="display-1">
        <span className="text-blue">ReadMei</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <br></br>
        <label >User Email:&nbsp;</label>
        <input 
          type="text"  
          value={emailValue}
          onChange={handleEmailChange}>
        </input>
        <br></br>
        <div style={{ height: '5px' }}></div>
        <label >Password:&nbsp;&nbsp;&nbsp;</label>
          <input 
          type="password"  
          value={pwValue}
          onChange={handlePwChange}>
        </input>
        <div style={{ height: '15px' }}></div>
        <button type="submit" className="btn btn-lg text-white background-blue">Log In</button>
      </form>
      {showAlert && 
            <div role="alert">
            {alertMessage}
            </div>
      }
      </div>
    </>
  );
}

export default RegistrationLogin;