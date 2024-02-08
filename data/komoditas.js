// utilize local storage
import komoditasDefault from "@/data/konversi_satuan.json";
import { uuid } from "uuidv4";

export const getLocalKomoditas = () => {
  return JSON.parse(localStorage.getItem("komoditas"));
};

export const getDefaultKomoditas = () => {
  return komoditasDefault.map((k) => {
    return { ...k, is_created_by_user: false };
  });
};

export const getKomoditas = () => {
  const localKomoditas = getLocalKomoditas();
  const defaultKomoditas = getDefaultKomoditas();

  return localKomoditas
    ? [...localKomoditas, ...defaultKomoditas]
    : defaultKomoditas;
};

export const getKomoditasById = (id) => {
  return getKomoditas().komoditas.filter((item) => item.index == id);
};

export const addKomoditas = (
  kategori,
  nama_komoditas,
  satuan_subsatuan,
  faktor_pengali,
  satuan_standar
) => {
  const newkomoditas = {
    index: uuid(),
    kategori,
    nama_komoditas,
    satuan_subsatuan,
    faktor_pengali,
    satuan_standar,
    id_komoditas: kategori + "_" + nama_komoditas,
    is_created_by_user: true,
  };

  let res = [newkomoditas];

  if (typeof Storage !== "undefined") {
    try {
      const customkomoditas = getKomoditas().filter(
        (k) => k.is_created_by_user
      );
      if (customkomoditas && customkomoditas.length > 0) {
        res = [...res, ...customkomoditas];
      }
      localStorage.setItem("komoditas", JSON.stringify(res));
    } catch (e) {
      console.log(e);
    }
  }
  return { ...newkomoditas, is_checked: true, is_filtered: false, amount: 1 };
};

export const updateKomoditasById = (
  id,
  kategori,
  nama_komoditas,
  satuan_subsatuan,
  faktor_pengali,
  satuan_standar
) => {
  let allKomoditas = getKomoditas();
  let komoditas = allKomoditas.filter((item) => item.index == id)[0];

  if (!allKomoditas) {
    return new Error("empty komoditas");
  }

  if (!komoditas) {
    return new Error("not found");
  }

  const updatedKomoditas = {
    ...komoditas,
    kategori,
    nama_komoditas,
    satuan_subsatuan,
    faktor_pengali,
    satuan_standar,
  };

  const res = allKomoditas.map((item) => {
    if (item.index === id) {
      return updatedKomoditas;
    }
    return item;
  });

  if (typeof Storage !== "undefined" && komoditas.is_created_by_user) {
    try {
      localStorage.setItem(
        "komoditas",
        JSON.stringify(res.filter((k) => k.is_created_by_user))
      );
    } catch (e) {
      console.log(e);
    }
  }
  return updatedKomoditas;
};

export const deleteKomoditas = (id_komoditas) => {
  console.log(id_komoditas);
  const komoditas = getKomoditas();
  const res = komoditas.filter(
    (item) => item.id_komoditas != id_komoditas && item.is_created_by_user
  );
  if (typeof Storage !== "undefined") {
    try {
      localStorage.setItem("komoditas", JSON.stringify(res));
      return true;
    } catch (e) {
      return false;
    }
  }
  return false;
};

export const remapUniqueKomoditas = (komoditas) => {
  return [...new Set(komoditas.map((item) => item.id_komoditas))].map(
    (id_komoditas, id) => {
      let tempData = komoditas.filter((item) =>
        item.id_komoditas.includes(id_komoditas)
      );

      return {
        id,
        id_komoditas,
        is_checked: tempData.some((k) => k.is_checked),
        is_filtered: tempData.some((k) => k.is_filtered),
        selected_satuan_standar: tempData[0].satuan_standar,
        selected_satuan: tempData[0].satuan_subsatuan,
        is_created_by_user: tempData.some((k) => k.is_created_by_user),
        konversi: tempData.map((item) => {
          return {
            satuan_standar: item.satuan_standar,
            satuan_subsatuan: item.satuan_subsatuan,
            faktor_pengali: item.faktor_pengali,
          };
        }),
        amount: 1,
      };
    }
  );
};
