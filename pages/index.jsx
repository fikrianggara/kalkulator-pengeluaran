import { data as dummyData } from "@/data";
import { useEffect, useState } from "react";
import {
  IconCircleCheckFilled,
  IconCopy,
  IconCirclePlus,
  IconPencil,
  IconX,
} from "@tabler/icons-react";
import { Home as HomeCard } from "@/components/Card";
import { Modal as FormModal } from "@/components/Modal";
const TITLE = "Kalkulator Pengeluaran";

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export const ListItem = ({ data, callback }) => {
  return (
    <ul className="text-sm">
      {data.map((item) => (
        <li
          key={item._id}
          className={`flex space-x-2 hover:bg-gray-50 hover:text-blue-500 hover:cursor-pointer p-2 text-gray-600 rounded-lg duration-200 ease-in-out ${
            item.is_checked ? "text-green-500" : ""
          }`}
          onClick={(e) => callback(item._id)}
          disabled={item.is_checked}
        >
          {item.is_checked ? (
            <IconCircleCheckFilled color="gray" size={24} stroke={2} />
          ) : (
            <IconCirclePlus size={24} stroke={2} color="gray" />
          )}
          <span>{item.nama}</span>
        </li>
      ))}
    </ul>
  );
};

export const ListSelectedItem = ({ data, callback }) => {
  return (
    <ul className="text-sm space-y-2">
      {data.map((item) => (
        <li key={item._id} className={`flex space-x-2 `}>
          <div className="flex w-full justify-between items-center">
            <div className="flex space-x-4 items-center">
              <span>{item.amount}</span>
              <IconX size={16} />
              <span>{item.nama}</span>
              <span>-</span>
              <span> {formatter.format(item.biaya)}</span>
              {/* {item.amount} X {item.nama} - {formatter.format(item.biaya)} */}
            </div>
            <div
              className="p-2 relative text-white shadow rounded-md bg-gradient-to-tr from-gray-400 to-gray-200 hover:cursor-pointer hover:shadow-lg duration-300 ease-in-out"
              onClick={(e) => callback(item)}
            >
              <IconPencil size={20} />
            </div>
          </div>
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
  const [showTooltip, setShowTooltip] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState(null);
  let pengeluaranComp;
  let modalComp;
  useEffect(() => {
    setData(dummyData);
    setFilteredData(dummyData);
  }, []);
  useEffect(() => {
    if (isOpen) {
      modalComp = <FormModal callback={onModalClickHandler} item={item} />;
    }
  }, [isOpen]);
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
          <ListItem data={filteredData} callback={pengeluaranClickHandler} />
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
  const onModalClickHandler = (item) => {
    setItem(item);
    setIsOpen((prev) => !prev);
  };
  // console.log("filteredData", filteredData);
  return (
    <main className="bg-gray-50 min-h-screen space-y-4 relative">
      {/* {isOpen ? <FormModal callback={onModalClickHandler} /> : ""} */}
      {modalComp}
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
            <div className="flex space-x-2 relative">
              Total :{" "}
              <div
                className="flex space-x-2 items-center w-fit text-blue-500 hover:cursor-pointer hover:underline"
                onClick={() => {
                  navigator.clipboard.writeText(total);
                  setShowTooltip(true);
                  setTimeout(() => setShowTooltip(false), 2500);
                }}
              >
                <span>{formatter.format(total)}</span>

                <IconCopy size={20} />
              </div>
              <span
                className="absolute -bottom-6 right-2 bg-gray-100 px-2 py-1 rounded text-xs duration-1000 text-black shadow-md"
                style={{
                  display: showTooltip ? "block" : "none",
                }}
              >
                Nilai disalin !
              </span>
            </div>
          </div>
        }
      >
        {selectedData.length > 0 ? (
          <ListSelectedItem
            data={selectedData}
            callback={onModalClickHandler}
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
