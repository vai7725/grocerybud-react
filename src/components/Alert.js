import React, { useEffect } from "react";

const Alert = ({ msg, bg, closeAlert }) => {
  useEffect(() => {
    setTimeout(() => {
      closeAlert();
    }, 2000);
  });
  return (
    <>
      <p style={{ backgroundColor: bg }} className="alert">
        {msg}
      </p>
    </>
  );
};

export default Alert;
