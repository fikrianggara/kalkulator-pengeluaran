import { addData, data as dummyData, updateDataById, deleteData } from "@/data";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  IconCircleCheckFilled,
  IconCopy,
  IconCirclePlus,
  IconPencil,
  IconX,
  IconTrash,
  IconLogin,
} from "@tabler/icons-react";
import {
  Home as HomeCard,
  ModalCreateKomoditi as ModalCreateKomoditiCard,
  ModalUpdatelKomoditi as ModalUpdateKomoditiCard,
} from "@/components/Card";
import { Modal as FormModal } from "@/components/Modal";
import { getKomoditi } from "@/data/komoditi";

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export const ListItem = ({ data, callback, deleteDataCallback }) => {
  return (
    <ul className="text-sm space-y-2 h-[200px] overflow-y-auto scrollbar-thumb-gray-400 scrollbar-thin scrollbar-rounded-large scrollbar-track-gray-100">
      {data.map((item) => (
        <li
          key={item.id}
          className="flex justify-between space-x-2 bg-gray-50 p-2 rounded-lg pr-4 items-center"
        >
          <div
            className={`flex flex-1 space-x-2  hover:cursor-pointer hover:text-blue-500 text-gray-600 duration-200 ease-in-out text-sm ${
              item.is_checked ? "text-green-500" : ""
            }`}
            onClick={(e) => callback(item.id)}
            disabled={item.is_checked}
          >
            {item.is_checked ? (
              <IconCircleCheckFilled color="gray" size={24} stroke={2} />
            ) : (
              <IconCirclePlus size={24} stroke={2} color="gray" />
            )}
            <div
              className={`${
                item.is_checked ? "text-green-500 hover:text-blue-500" : ""
              }`}
            >
              <span className={`font-medium `}>
                {item.id_komoditas.split("_")[0]}
              </span>
              {" - "}
              <span> {item.id_komoditas.split("_")[1]}</span>
            </div>
          </div>
          {item.is_created_by_user && (
            <div
              className="p-2 relative text-white shadow rounded-md bg-gradient-to-tr from-red-400 to-orange-200 hover:cursor-pointer hover:shadow-lg duration-300 ease-in-out"
              onClick={() => {
                deleteDataCallback(item.id);
              }}
            >
              <IconTrash size={20} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export const ListSelectedItem = ({
  data,
  updateDataCallback,
  deleteDataCallback,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);

  const onModalClickHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {isOpen && (
        <FormModal callback={onModalClickHandler}>
          <ModalUpdateKomoditiCard
            item={modalItem}
            callback={onModalClickHandler}
            updateDataCallback={updateDataCallback}
          />
        </FormModal>
      )}
      <ul className="text-sm space-y-2">
        {data.map((item) => (
          <li
            key={item.id}
            className={`flex space-x-2 bg-gray-50 p-2 rounded-lg shadow`}
          >
            <div className="flex w-full items-center space-x-4">
              <div
                className="p-2 relative text-white shadow rounded-md bg-gradient-to-tr from-red-400 to-orange-200 hover:cursor-pointer hover:shadow-lg duration-300 ease-in-out"
                onClick={() => {
                  deleteDataCallback(item.id);
                }}
              >
                <IconX size={20} />
              </div>
              <div
                className="p-2 relative text-white shadow rounded-md bg-gradient-to-tr from-gray-400 to-sky-200 hover:cursor-pointer hover:shadow-lg duration-300 ease-in-out"
                onClick={() => {
                  setIsOpen((prev) => !prev);
                  setModalItem(item);
                }}
              >
                <IconPencil size={20} />
              </div>

              <div className="flex sm:space-x-2 md:space-x-4 items-center overflow-x-auto text-xs md:text-regular p-2 flex-col sm:flex-row space-y-2 sm:space-y-0 items-start justify-start">
                <div className="self-start">
                  {item.id_komoditas.split("_")[1]}
                </div>
                <div
                  className="self-start flex"
                  onClick={() => {
                    setIsOpen((prev) => !prev);
                    setModalItem(item);
                  }}
                >
                  <span>
                    {Math.round(item.amount * 100) / 100} {item.selected_satuan}
                  </span>
                  <span>=</span>
                  <span className="font-bold">
                    {item.amount *
                      item.konversi.filter(
                        (k) => k.satuan_subsatuan == item.selected_satuan
                      )[0].faktor_pengali}
                  </span>{" "}
                  <span className="font-bold">{item.satuan_standar}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export const SearchForm = ({
  placeholder = "cari kategori pengeluaran",
  callback,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const onChangeHandler = (e) => {
    setSearchInput(e.target.value);
    callback(e.target.value);
  };
  return (
    <div className="border-[0.5px] rounded-lg bg-gray-100 w-full md:w-11/12 lg:w-8/12 m-auto">
      <input
        type="text"
        placeholder={placeholder}
        className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm placeholder-slate-400
      focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        value={searchInput}
        onChange={onChangeHandler}
      />
    </div>
  );
};

// kita butuh, is_filtered, is_checked
export default function Home() {
  const [total, setTotal] = useState(0);
  const [selectedData, setSelectedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [uniqueKomoditas, setUniqueKomoditas] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  let komoditiComp;
  useEffect(() => {
    let tempData;
    // kalau mendukung localStorage dan ada data,
    // ambil data itu, tambahin atribut is_checked, is_filtered, amount
    if (typeof Storage !== "undefined") {
      console.log(getKomoditi());
    }
    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("komoditas") !== null
    ) {
      const lsData = JSON.parse(localStorage.getItem("data_komoditas"));
      // hapus data sebelumnya
      if (lsData.filter((item) => item._id == 1).length > 0) {
        localStorage.removeItem("data");
      }

      if (lsData.length > 0) {
        tempData = lsData.map((item) => {
          return { ...item, is_checked: false, is_filtered: false, amount: 1 };
        });
      }
    }

    fetch("/api/komoditas/all")
      .then((data) => data.json())
      .then((dataJson) => {
        // remap data

        const dataFetch = dataJson.data.map((item) => {
          return { ...item, is_checked: false, is_filtered: false, amount: 1 };
        });

        const uniqueKomoditas = [
          ...new Set(dataJson.data.map((item) => item.id_komoditas)),
        ].map((id_komoditas, id) => {
          let tempData = dataFetch.filter((item) =>
            item.id_komoditas.includes(id_komoditas)
          );

          return {
            id,
            id_komoditas,
            is_checked: false,
            is_filtered: false,
            satuan_standar: tempData[0].satuan_standar,
            selected_satuan: tempData[0].satuan_subsatuan,
            konversi: tempData.map((item) => {
              return {
                satuan_standar: item.satuan_standar,
                satuan_subsatuan: item.satuan_subsatuan,
                faktor_pengali: item.faktor_pengali,
              };
            }),
            amount: 1,
          };
        });
        // kalau ada tempData, taruh di atas list
        if (tempData) {
          setData(() => [...tempData, ...dataFetch]);
          setUniqueKomoditas([...tempData, ...uniqueKomoditas]);
          setFilteredData(() => [...tempData, ...uniqueKomoditas]);
        } else {
          setData(dataFetch);
          setUniqueKomoditas(uniqueKomoditas);
          setFilteredData(uniqueKomoditas);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  const komoditasClickHandler = (id) => {
    let updatedItem;
    let updatedData = uniqueKomoditas.map((item) => {
      if (item.id == id) {
        updatedItem = { ...item, is_checked: !item.is_checked, amount: 1 };
        return updatedItem;
      }
      return item;
    });
    setUniqueKomoditas(updatedData);
    // taruh data yang diklik ke paling bawah
    const tempSelectedData = [
      ...updatedData.filter((item) => item.is_checked && item.id != id),
    ];
    if (updatedItem.is_checked) {
      tempSelectedData.push(updatedItem);
    }
    setSelectedData(tempSelectedData);
    setFilteredData((prev) =>
      prev.map((item) => {
        if (item.id == id) {
          return updatedItem;
        }
        return item;
      })
    );
  };

  const updateDataHandler = (item) => {
    // let tempData = updateDataById(item);
    const tempData = uniqueKomoditas.map((d) => {
      if (d.id == item.id) {
        return item;
      }
      return d;
    });
    const tempSelectedData = tempData.filter((item) => item.is_checked);
    setSelectedData(tempSelectedData);
    setUniqueKomoditas(tempData);
    // setFilteredData(tempData);
  };

  const addDataHandler = (kategori, nama, biaya) => {
    let tempData = addData(kategori, nama, biaya);
    tempData = [tempData, ...data];
    const tempSelectedData = tempData.filter((item) => item.is_checked);
    setSelectedData(tempSelectedData);
    setData(tempData);
    setFilteredData(tempData);
  };

  const deleteDataHandler = (id) => {
    deleteData(id);
    let tempData = data.filter((item) => item._id != id);
    const tempSelectedData = tempData.filter((item) => item.is_checked);
    setSelectedData(tempSelectedData);
    setData(tempData);
    setFilteredData(tempData);
  };
  const onModalClickHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const resetSelection = () => {
    const dataFetch = data.map((item) => {
      return { ...item, is_checked: false, is_filtered: false, amount: 1 };
    });
    const uniqueKomoditas = [
      ...new Set(data.map((item) => item.id_komoditas)),
    ].map((id_komoditas, id) => {
      let tempData = dataFetch.filter((item) =>
        item.id_komoditas.includes(id_komoditas)
      );

      return {
        id,
        id_komoditas,
        is_checked: false,
        is_filtered: false,
        satuan_standar: tempData[0].satuan_standar,
        selected_satuan: tempData[0].satuan_subsatuan,
        konversi: tempData.map((item) => {
          return {
            satuan_standar: item.satuan_standar,
            satuan_subsatuan: item.satuan_subsatuan,
            faktor_pengali: item.faktor_pengali,
          };
        }),
        amount: 1,
      };
    });
    setData(dataFetch);
    setUniqueKomoditas(uniqueKomoditas);
    setFilteredData(uniqueKomoditas);
    setSelectedData([]);
  };

  if (!data) {
    return (
      <div>
        <h1>...loading</h1>
      </div>
    );
  } else {
    komoditiComp = (
      <>
        {filteredData.length > 0 ? (
          <ListItem
            data={filteredData}
            callback={komoditasClickHandler}
            deleteDataCallback={deleteDataHandler}
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
      setFilteredData(uniqueKomoditas);
    } else {
      const tempData = uniqueKomoditas.filter((item) => {
        return item.id_komoditas.toLowerCase().includes(filterInput);
      });
      setFilteredData(tempData);
    }
  };

  return (
    <>
      <HomeCard title="Konversi Satuan Komoditas">
        <div className="space-y-2">
          {isOpen && (
            <div className="">
              <FormModal callback={onModalClickHandler}>
                <ModalCreateKomoditiCard
                  item={data[0]}
                  callback={onModalClickHandler}
                  addDataCallback={addDataHandler}
                  listKategori={[...new Set(data.map((item) => item.kategori))]}
                />
              </FormModal>
            </div>
          )}
          <SearchForm
            callback={searchChangeHandler}
            placeholder="Cari komoditas"
          />
          {komoditiComp}
          <div className="flex m-auto w-full justify-between items-center p-2">
            {selectedData.length > 0 ? (
              <div
                className="border rounded-lg border-gray-200 px-4 py-2 text-xs sm:text-sm text-gray-400 hover:text-gray-600 hover:border-gray-400 hover:bg-gray-100 duration-200 ease-in-out hover:cursor-pointer"
                onClick={resetSelection}
              >
                reset pilihan
              </div>
            ) : (
              <div
                className="border rounded-lg border-gray-200 px-4 py-2 text-xs sm:text-sm text-gray-400 cursor-not-allowed"
                // onClick={resetSelection}
              >
                reset pilihan
              </div>
            )}
            <div
              onClick={onModalClickHandler}
              className="hover:cursor-pointer hover:text-green-500 text-gray-400 duration-200 ease-in-out"
            >
              <IconCirclePlus size={30} stroke={2} />
            </div>
          </div>
        </div>
      </HomeCard>
      <HomeCard
        title={
          <div className="flex justify-between">
            <span>Komoditas</span>
          </div>
        }
      >
        {selectedData.length > 0 ? (
          <ListSelectedItem
            data={selectedData}
            updateDataCallback={updateDataHandler}
            deleteDataCallback={komoditasClickHandler}
          />
        ) : (
          <div className="m-auto text-center text-gray-400">
            Belum ada Komoditas
          </div>
        )}
      </HomeCard>
    </>
  );
}
