"use client";
import React from "react";

type Props = { name: string };

const GreetingButton = (props: Props) => {
  return (
    <button
      onClick={() => {
        // alert("Welcome Back Mamen " + props.name);
        alert(`Welcome ${props.name}`);
      }}
      className="bg-amber-200 p-2 text-black rounded-2xl"
    >
      Greeting {props.name}
    </button>
  );
};

export default GreetingButton;
