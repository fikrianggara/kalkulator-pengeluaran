import React from "react";

export const Modal = ({ item, callback }) => {
  console.log(item);
  return (
    <div
      className="w-screen h-screen bg-black opacity-25 absolute z-10"
      onClick={(e) => {
        console.log("kepencet");
        callback();
      }}
    >
      {item}
    </div>
  );
};
