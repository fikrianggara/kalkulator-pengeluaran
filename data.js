import { uuid } from "uuidv4";
export const data = [
  { _id: 1, kategori: "bpjs", biaya: 150000, is_checked: false, amount: 1 },
  { _id: 2, kategori: "listrik", biaya: 450000, is_checked: false, amount: 1 },
  { _id: 3, kategori: "internet", biaya: 400000, is_checked: false, amount: 1 },
  { _id: 4, kategori: "makan", biaya: 20000, is_checked: false, amount: 1 },
  {
    _id: 5,
    kategori: "transportasi",
    biaya: 100000,
    is_checked: false,
    amount: 1,
  },
  { _id: 6, kategori: "sekolah", biaya: 1000000, is_checked: false, amount: 1 },
];

export const updateDataById = (updatedData, data) => {
  const res = data.map((item) => {
    if (item._id === updatedData._id) {
      item = { ...updatedData };
    }
    return item;
  });
  return res;
};

export const addData = (kategori, nama, biaya, data) => {
  const newData = {
    _id: uuid(),
    kategori,
    nama,
    is_checked: false,
    biaya,
    amount: 1,
  };
  const res = [...data, newData];
  return res;
};
