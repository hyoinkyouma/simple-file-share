import React from "react";

const Button = (props) => {
  return (
    <>
      <button
        className={`btn shadow-md p-2 ${
          props.color == undefined ? "bg-slate-600" : props.color
        } text-white rounded-md w-[7rem]`}
        onClick={props.onClick}
      >
        {props.text}
      </button>
    </>
  );
};

export default Button;
