import React from "react";

const Button = ({
  handleClick,
  buttonText,
}: {
  handleClick: () => void;
  buttonText: string;
}) => {
  return (
    <button
      onClick={handleClick}
      className="end-election-button button-primary"
    >
      {buttonText}
    </button>
  );
};

export default Button;
