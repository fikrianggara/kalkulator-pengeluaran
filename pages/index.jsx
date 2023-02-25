import { data as dummyData } from "@/data";
import { useEffect, useState } from "react";
// import { IconCheck } from "@tabler/icons";
import { Home as HomeCard } from "@/components/Card";
const TITLE = "Kalkulator Pengeluaran";

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export const ListItem = ({ data, callback, isPengeluaran }) => {
  return (
    <ul>
      {data.map((item) => (
        <li
          key={item._id}
          className={`hover:bg-gray-50 hover:text-blue-500 hover:cursor-pointer p-2 rounded-lg ${
            item.is_checked && !isPengeluaran ? "text-green-500" : ""
          }`}
          onClick={(e) => callback(item._id)}
          disabled={item.is_checked}
        >
          {item.nama} - Rp. {formatter.format(item.biaya)}
        </li>
      ))}
    </ul>
  );
};

export const SearchForm = ({ callback }) => {
  const [searchInput, setSearchInput] = useState("");
  const onChangeHandler = (e) => {
    setSearchInput(e.target.value);
    callback(e.target.value);
  };
  return (
    <div className="border-[0.5px] rounded-lg bg-gray-100 w-full md:w-11/12 lg:w-8/12 m-auto">
      <input
        type="text"
        placeholder="bpjs"
        className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm placeholder-slate-400
      focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        value={searchInput}
        onChange={onChangeHandler}
      />
    </div>
  );
};
export default function Home() {
  const [total, setTotal] = useState(0);
  const [selectedData, setSelectedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);

  let pengeluaranComp;

  useEffect(() => {
    setData(dummyData);
    setFilteredData(dummyData);
  }, []);

  const getTotal = (total, item) => {
    return total + item.biaya;
  };

  const pengeluaranClickHandler = (id) => {
    const tempData = data.map((item) => {
      if (item._id == id) {
        item.is_checked = !item.is_checked;
      }
      return item;
    });
    setData(tempData);
    console.log("tempData", tempData);
    const tempSelectedData = tempData.filter((item) => item.is_checked);

    setSelectedData(tempSelectedData);
    setTotal(tempSelectedData.reduce(getTotal, 0));
  };
  if (!data) {
    return (
      <div>
        <h1>...loading</h1>
      </div>
    );
  } else {
    pengeluaranComp = (
      <>
        {filteredData.length > 0 ? (
          <ListItem
            data={filteredData}
            callback={pengeluaranClickHandler}
            isPengeluaran={false}
          />
        ) : (
          <div className="m-auto text-center text-gray-400">Tidak ada data</div>
        )}
      </>
    );
  }
  const searchChangeHandler = (input) => {
    const filterInput = input.toLowerCase();
    if (filterInput.length < 1) {
      setFilteredData(data);
    } else {
      const tempData = data.filter((item) => item.nama.includes(filterInput));
      console.log(tempData);
      setFilteredData(tempData);
    }
  };
  // console.log("filteredData", filteredData);
  return (
    <main className="bg-gray-50 min-h-screen space-y-4">
      <nav className="p-4 bg-gray-100 shadow">
        <div>
          <h1 className="text-gray-700 text-xl text-center font-medium">
            {TITLE}
          </h1>
        </div>
      </nav>
      <HomeCard title="Kategori Pengeluaran">
        <div className="space-y-2">
          <SearchForm callback={searchChangeHandler} />
          {pengeluaranComp}
        </div>
      </HomeCard>
      <HomeCard
        title={
          <div className="flex justify-between">
            <span>Pengeluaran</span>
            <span>
              Total :{" "}
              <span className="text-blue-500">
                Rp. {formatter.format(total)}
              </span>
            </span>
          </div>
        }
      >
        {selectedData.length > 0 ? (
          <ListItem
            data={selectedData}
            callback={() => console.log("clicked")}
            isPengeluaran={true}
          />
        ) : (
          <div className="m-auto text-center text-gray-400">
            Belum ada Pengeluaran
          </div>
        )}
      </HomeCard>
    </main>
  );
}
