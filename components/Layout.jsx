import React from "react";
import {
  IconCalculator,
  IconCalculatorFilled,
  IconTransform,
  IconTransformFilled,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import Link from "next/link";

const layout = ({ children }) => {
  const router = useRouter();

  return (
    <main className="bg-gray-50 min-h-screen space-y-4 relative pb-48 relative">
      <nav className="p-4 bg-gray-100 shadow">
        <div>
          <h1 className="text-gray-700 text-xl text-center font-medium">
            Expenditure Wizard
          </h1>
        </div>
      </nav>
      <div className="w-full bg-green-500 fixed bottom-0 z-20 bg-white p-4">
        <div className="w-11/12 md:w-8/12 lg:w-6/12 bg-white m-auto flex justify-evenly items-center h-fit">
          <Link
            href={"/"}
            className="px-6 py-2 rounded-lg hover:bg-gray-50 border border-gray-200 hover:border-gray-400 text-gray-400 hover:text-gray-500 duration-300 ease-in-out"
          >
            {router.pathname == "/" ? (
              <IconCalculatorFilled size={24} />
            ) : (
              <IconCalculator size={24} />
            )}
          </Link>
          <Link
            href={"/konversi"}
            className="px-6 py-2 rounded-lg hover:bg-gray-50 border border-gray-200 hover:border-gray-400 text-gray-400 hover:text-gray-500 duration-300 ease-in-out"
          >
            {router.pathname == "/" ? (
              <IconTransform size={24} />
            ) : (
              <IconTransformFilled size={24} />
            )}
          </Link>
        </div>
      </div>
      {children}
      <footer className="h-24 p-4 bg-gray-100 font-medium text-center m-auto text-sm md:text-base text-gray-600 absolute bottom-0 inset-x-0 pb-36">
        Made by{" "}
        <a href="https://github.com/fikrianggara" className="text-blue-500">
          Fikri Septrian A.
        </a>
        , in collaboration with{" "}
        <a href="https://tanjabtimkab.bps.go.id/" className="text-blue-500">
          BPS Tanjung Jabung Timur
        </a>
      </footer>
    </main>
  );
};

export default layout;
