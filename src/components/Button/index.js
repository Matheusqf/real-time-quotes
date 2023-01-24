import React from "react";
import * as C from "./styles";

const Button = ({ onClick, Text, Type = "button" }) => {
  return (
    <C.Button type={Type} onClick={onClick}>
      {Text}
    </C.Button>
  );
};

export default Button;
