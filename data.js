import { uuid } from "uuidv4";
export const data = [
  {
    _id: 1,
    kategori: "Imunisasi",
    nama: "Hepatitis B",
    biaya: 120000,
    is_checked: false,
    amount: 1,
    is_deleteable: false,
  },
  {
    _id: 2,
    kategori: "Imunisasi",
    nama: "BCG",
    biaya: 375000,
    is_checked: false,
    amount: 1,
    is_deleteable: false,
  },
  {
    _id: 3,
    kategori: "Imunisasi",
    nama: "Polio Tetes",
    biaya: 125000,
    is_checked: false,
    amount: 1,
    is_deleteable: false,
  },
  {
    _id: 4,
    kategori: "Imunisasi",
    nama: "Polio Suntik (IPV)",
    biaya: 300000,
    is_checked: false,
    amount: 1,
    is_deleteable: false,
  },
  {
    _id: 5,
    kategori: "Imunisasi",
    nama: "DPT Hib Hb",
    biaya: 350000,
    is_checked: false,
    amount: 1,
    is_deleteable: false,
  },
  {
    _id: 6,
    kategori: "Imunisasi",
    nama: "Campak Rubella",
    biaya: 155000,
    is_checked: false,
    amount: 1,
    is_deleteable: false,
  },
  {
    _id: 7,
    kategori: "Imunisasi",
    nama: "MMR",
    biaya: 475000,
    is_checked: false,
    amount: 1,
    is_deleteable: false,
  },
  {
    _id: 8,
    kategori: "Listrik",
    nama: "450 VA",
    biaya: 0,
    is_checked: false,
    amount: 1,
    is_deleteable: false,
  },
  {
    _id: 9,
    kategori: "Listrik",
    nama: "900 VA",
    biaya: 1352,
    is_checked: false,
    amount: 1,
    is_deleteable: false,
  },
  {
    _id: 10,
    kategori: "Listrik",
    nama: "1300 VA",
    biaya: 1445,
    is_checked: false,
    amount: 1,
    is_deleteable: false,
  },
  {
    _id: 11,
    kategori: "Listrik",
    nama: "2200 VA",
    biaya: 1445,
    is_checked: false,
    amount: 1,
    is_deleteable: false,
  },
  {
    _id: 12,
    kategori: "Listrik",
    nama: "3500-5500 VA",
    biaya: 1670,
    is_checked: false,
    amount: 1,
    is_deleteable: false,
  },
  {
    _id: 13,
    kategori: "Listrik",
    nama: ">6600 VA",
    biaya: 1445,
    is_checked: false,
    amount: 1,
    is_deleteable: false,
  },
  {
    _id: 14,
    kategori: "BPJS",
    nama: "Kelas 1",
    biaya: 150000,
    is_checked: false,
    amount: 1,
    is_deleteable: false,
  },
  {
    _id: 15,
    kategori: "BPJS",
    nama: "Kelas 2",
    biaya: 100000,
    is_checked: false,
    amount: 1,
    is_deleteable: false,
  },
  {
    _id: 16,
    kategori: "BPJS",
    nama: "Kelas 3",
    biaya: 42000,
    is_checked: false,
    amount: 1,
    is_deleteable: false,
  },
  {
    _id: 17,
    kategori: "Pendidikan (BOS)",
    nama: "SD",
    biaya: 950000,
    is_checked: false,
    amount: 1,
    is_deleteable: false,
  },
  {
    _id: 18,
    kategori: "Pendidikan (BOS)",
    nama: "SMP",
    biaya: 1190000,
    is_checked: false,
    amount: 1,
    is_deleteable: false,
  },
  {
    _id: 19,
    kategori: "Pendidikan (BOS)",
    nama: "SMA",
    biaya: 1620000,
    is_checked: false,
    amount: 1,
    is_deleteable: false,
  },
  {
    _id: 20,
    kategori: "Pendidikan (BOS)",
    nama: "SMK",
    biaya: 1730000,
    is_checked: false,
    amount: 1,
    is_deleteable: false,
  },
  {
    _id: 21,
    kategori: "Pendidikan (BOS)",
    nama: "SLB",
    biaya: 3750000,
    is_checked: false,
    amount: 1,
    is_deleteable: false,
  },
];

export const updateDataById = (updatedData, data) => {
  let prevBiaya;
  const res = data.map((item) => {
    if (item._id === updatedData._id) {
      prevBiaya = item.biaya;
      return { ...updatedData };
    }
    return item;
  });
  if (
    typeof Storage !== "undefined" &&
    (updatedData.is_deleteable ||
      (!updatedData.is_deleteable && prevBiaya === updatedData.biaya))
  ) {
    localStorage.setItem("data", JSON.stringify(res));
    return JSON.parse(localStorage.getItem("data"));
  } else {
    return res;
  }
};

export const addData = (kategori, nama, biaya, data) => {
  const newData = {
    _id: uuid(),
    kategori,
    nama,
    is_checked: true,
    biaya,
    amount: 1,
    is_deleteable: true,
  };
  const res = [...data, newData];
  if (typeof Storage !== "undefined") {
    localStorage.setItem("data", JSON.stringify(res));
    console.log(JSON.parse(localStorage.getItem("data")));
    return JSON.parse(localStorage.getItem("data"));
  } else {
    return res;
  }
};

export const deleteData = (id, data) => {
  const res = data.filter((item) => item._id != id);
  if (typeof Storage !== "undefined") {
    localStorage.setItem("data", JSON.stringify(res));
    return JSON.parse(localStorage.getItem("data"));
  } else {
    return res;
  }
};
