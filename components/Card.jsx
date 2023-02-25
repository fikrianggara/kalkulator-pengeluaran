import React from "react";

export const Home = ({ children, title }) => {
  return (
    <div className="w-11/12 md:w-8/12 lg:w-6/12 bg-white m-auto rounded-xl h-fit p-4 space-y-2 shadow">
      <h2 className="text-lg font-medium text-gray-600 border-b-[0.5px] pb-2">
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
};
