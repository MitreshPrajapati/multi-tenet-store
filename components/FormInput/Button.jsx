import React from "react";

const Button = ({ btnText, btnIcon, onClick, className, btnIconStyle }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center py-2 px-4 space-x-2 rounded-lg ${className}`}
    >
      {btnIcon && btnIcon }
      Button {btnText}
    </button>
  );
};

export default Button;
