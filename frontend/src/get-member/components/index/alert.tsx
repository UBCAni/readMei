import React, { useState, useEffect } from 'react';
import 'scss/style.scss' // Import CSS file for styling

interface AlertProps {
  message: string;
}

const Alert: React.FC<AlertProps> = ({ message }) => {
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000); // 2000 milliseconds = 2 seconds

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, []); // This effect runs only once after component mount

  return (
    <div className={`alert ${visible ? 'show' : 'hide'}`}>
      {message}
    </div>
  );
};

export default Alert;