import React, { useState } from "react";

export const Home = ({ children, title }) => {
  return (
    <div className="w-11/12 md:w-8/12 lg:w-6/12 bg-white m-auto rounded-xl h-fit p-4 space-y-2 shadow">
      <h2 className="md:text-lg font-medium text-gray-600 border-b-[0.5px] pb-2">
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
};

export const Modal = ({ item, callback, updateDataCallback }) => {
  const [amount, setAmount] = useState(item.amount);
  const [biaya, setBiaya] = useState(item.biaya);

  const isInputValid = (biaya) => {
    const alphabets = /[a-zA-Z]/g;
    return !alphabets.test(biaya);
  };

  const onUpdateClickHandler = () => {
    if (isInputValid) {
      const itemUpdate = {
        ...item,
        amount: parseInt(amount),
        biaya: parseInt(biaya),
      };
      updateDataCallback(itemUpdate);
      callback();
    } else {
      setBiaya("");
    }
  };

  return (
    <div className="absolute text-xl text-black inset-0 m-auto items-center w-fit h-fit bg-white z-20 rounded-xl p-4 space-y-4 pb-8 shadow-lg">
      <h1 className="text-xl text-center font-medium text-gray-600">
        Perbarui Data
      </h1>
      <hr />
      <div className="flex flex-col m-auto items-center justify-center space-y-6 h-full text-base">
        <ul className="flex flex-col items-center space-y-4">
          <li key="nama" className="flex space-x-4 w-full justify-between">
            <span className="font-medium text-gray-600 flex-1">nama</span>
            <span className="flex-1">{item.nama}</span>
          </li>
          <li key="amount" className="flex space-x-4 w-full justify-between">
            <span className="font-medium text-gray-600 flex-1">jumlah</span>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm placeholder-slate-400
      focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 flex-1"
            />
          </li>
          <li key="biaya" className="flex space-x-4 w-full justify-between">
            <span className="font-medium text-gray-600 flex-1">biaya</span>
            <input
              type="text"
              value={biaya}
              onChange={(e) => setBiaya(e.target.value)}
              className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm placeholder-slate-400
      focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 flex-1"
            />
          </li>
        </ul>
        <div className=" flex space-x-4 items-center w-full">
          <div
            className="flex-1 p-2 text-center relative text-white shadow rounded-md bg-gradient-to-tr from-red-400 to-orange-200 hover:cursor-pointer hover:shadow-lg duration-300 ease-in-out"
            onClick={callback}
          >
            batal
          </div>
          <div
            className="flex-1 text-center p-2 relative text-white shadow rounded-md bg-gradient-to-tr from-green-400 to-blue-200 hover:cursor-pointer hover:shadow-lg duration-300 ease-in-out"
            onClick={onUpdateClickHandler}
          >
            perbarui
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModalCreate = ({ callback, addDataCallback, listKategori }) => {
  const [kategori, setKategori] = useState("");
  const [biaya, setBiaya] = useState("");
  const [nama, setNama] = useState("");

  const isInputValid = (biaya) => {
    const alphabets = /[a-zA-Z]/g;
    return !alphabets.test(biaya);
  };

  const onAddClickHandler = () => {
    if (isInputValid(biaya)) {
      addDataCallback(kategori, nama, parseInt(biaya));
      callback();
    } else {
      setBiaya("");
    }
  };

  return (
    <div className="absolute text-xl text-black inset-0 m-auto items-center w-fit h-fit bg-white z-20 rounded-xl p-4 space-y-4 pb-8 shadow-lg">
      <h1 className="text-lg text-center font-medium text-gray-600">
        Tambah Kategori Pengeluaran
      </h1>
      <hr />
      <div className="flex flex-col m-auto items-center justify-center space-y-6 h-full text-base">
        <ul className="flex flex-col items-center space-y-4">
          <li key="amount">
            <AutoCompleteInput
              data={listKategori}
              title="kategori"
              callback={setKategori}
            />
          </li>
          <li key="nama" className="flex space-x-4 w-full justify-between">
            <span className="font-medium text-gray-600 flex-1">nama</span>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm placeholder-slate-400
      focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 flex-1"
            />
          </li>

          <li key="biaya" className="flex space-x-4 w-full justify-between">
            <span className="font-medium text-gray-600 flex-1">biaya</span>
            <input
              type="text"
              value={biaya}
              onChange={(e) => setBiaya(e.target.value)}
              className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm placeholder-slate-400
      focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 flex-1"
            />
          </li>
        </ul>
        <div className=" flex space-x-4 items-center w-full">
          <div
            className="flex-1 p-2 text-center relative text-white shadow rounded-md bg-gradient-to-tr from-red-400 to-orange-200 hover:cursor-pointer hover:shadow-lg duration-300 ease-in-out"
            onClick={callback}
          >
            batal
          </div>
          <div
            className="flex-1 text-center p-2 relative text-white shadow rounded-md bg-gradient-to-tr from-green-400 to-blue-200 hover:cursor-pointer hover:shadow-lg duration-300 ease-in-out"
            onClick={onAddClickHandler}
          >
            tambah
          </div>
        </div>
      </div>
    </div>
  );
};

export const AutoCompleteInput = ({ data, callback, title }) => {
  const [selectedData, setSelectedData] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [isSelected, setIsSelected] = useState(false);

  const onChangeHandler = (e) => {
    setSelectedData(e.target.value);
    const filterInput = e.target.value.toLowerCase();
    if (filterInput.length < 1) {
      setFilteredData(data);
    } else {
      const tempData = data.filter((item) =>
        item.toLowerCase().includes(filterInput)
      );
      setFilteredData(tempData);
    }
    if (isSelected) {
      setIsSelected(false);
    }
    callback(e.target.value);
  };

  return (
    <div className="flex space-x-4 w-full justify-between">
      <span className="font-medium text-gray-600 flex-1">{title}</span>
      <div className="relative flex-1">
        <input
          type="text"
          value={selectedData}
          onChange={onChangeHandler}
          className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm placeholder-slate-400
      focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        {selectedData.length > 0 && !isSelected && (
          <div className="text-sm absolute p-2 top-12 inset-x-0 max-h-56 rounded-lg bg-white shadow-lg z-10 overflow-y-scroll scrollbar-thumb-gray-400 scrollbar-thin scrollbar-rounded-large scrollbar-track-gray-100">
            <ul>
              <li
                onClick={() => {
                  setIsSelected(true);
                  callback(selectedData);
                }}
                className="p-2 hover:bg-gray-50 rounded-lg hover:cursor-pointer"
              >
                {selectedData}
              </li>
              {filteredData.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setSelectedData(item);
                    callback(item);
                    setIsSelected(true);
                  }}
                  className="p-2 hover:bg-gray-50 rounded-lg hover:cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
