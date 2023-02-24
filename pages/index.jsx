import "../styles/globals.css";
import { data as dummyData } from "@/data";
import { useEffect, useState } from "react";
// import { IconCheck } from "@tabler/icons";

const TITLE = "Kalkulator Pengeluaran";

export default function Home() {
  const [total, setTotal] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(dummyData);
  }, []);

  const pengeluaranClickHandler = (id) => {
    // clickedData =  data.filter(item=>item.)
    // setSelectedData((prev)=>[...prev, ])
    console.log(id);
  };

  if (!data) {
    return (
      <div>
        <h1>...loading</h1>
      </div>
    );
  }
  console.log("refresh");
  return (
    <main className="bg-gray-50 min-h-screen space-y-4">
      <nav className="p-4 bg-gray-100 shadow">
        <div>
          <h1 className="text-gray-700 text-xl text-center font-medium">
            {TITLE}
          </h1>
        </div>
      </nav>
      <div className="w-11/12 bg-white m-auto rounded-xl h-fit p-4">
        <ul className="">
          {data.map((item) => (
            <li
              key={item._id}
              className="hover:bg-gray-50 hover:text-blue-500 hover:cursor-pointer p-2 rounded-lg"
              onClick={() => pengeluaranClickHandler(item._id)}
            >
              {item.nama} - Rp. {item.biaya}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
