import React from "react";

export default ({ input, label }) => {
  // console.log(props.input);
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
    </div>
  );
};
