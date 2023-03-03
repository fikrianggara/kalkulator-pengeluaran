export const data = [
  { _id: 1, nama: "bpjs", biaya: 150000, is_checked: false, amount: 1 },
  { _id: 2, nama: "listrik", biaya: 450000, is_checked: false, amount: 1 },
  { _id: 3, nama: "internet", biaya: 400000, is_checked: false, amount: 1 },
  { _id: 4, nama: "makan", biaya: 20000, is_checked: false, amount: 1 },
  { _id: 5, nama: "transportasi", biaya: 100000, is_checked: false, amount: 1 },
  { _id: 6, nama: "sekolah", biaya: 1000000, is_checked: false, amount: 1 },
];

export const updateDataById = (updatedData, data) => {
  const res = data.map((item) => {
    if (item._id === updatedData._id) {
      item = { ...updatedData };
    }
  });
  return res;
};
