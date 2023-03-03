import React from "react";

export const Modal = ({ item, callback }) => {
  console.log(item);
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-10 transition-opacity z-10"
      onClick={(e) => {
        callback();
      }}
    >
      <div className="text-xl tex-black inset-0 m-auto sm:w-11/12 w-8/10 h-fit bg-white z-20">
        {item.nama}
      </div>
    </div>
  );
};
