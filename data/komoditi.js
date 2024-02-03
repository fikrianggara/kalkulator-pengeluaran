// utilize local storage
import komoditiDefault from "@/data/konversi_satuan.json";

export const getLocalKomoditi = () => {
  return JSON.parse(localStorage.getItem("komoditi"));
};

export const getDefaultKomoditi = () => {
  return komoditiDefault.map((k) => {
    return { ...k, is_created_by_user: false };
  });
};

export const getKomoditi = () => {
  const localKomoditi = getLocalKomoditi();
  const defaultKomoditi = getDefaultKomoditi();

  return localKomoditi
    ? [...defaultKomoditi, ...localKomoditi]
    : defaultKomoditi;
};

export const getKomoditiById = (id) => {
  return getKomoditi().komoditi.filter((item) => item.index == id);
};

export const addKomoditi = (
  kategori,
  nama_komoditas,
  satuan_subsatuan,
  faktor_pengali,
  satuan_standar
) => {
  const newkomoditi = {
    index: uuid(),
    kategori,
    nama_komoditas,
    satuan_subsatuan,
    faktor_pengali,
    satuan_standar,
    id_komoditas: kategori + "_" + nama_komoditas,
    is_created_by_user: true,
  };

  let res = [newkomoditi];

  if (typeof Storage !== "undefined") {
    try {
      const customkomoditi = getKomoditi().filter((k) => k.is_created_by_user);
      if (customkomoditi && customkomoditi.length > 0) {
        res = [...customkomoditi, ...res];
      }
      localStorage.setItem("komoditi", JSON.stringify(res));
    } catch (e) {
      console.log(e);
    }
  }
  return newkomoditi;
};

export const updateKomoditiById = (
  id,
  kategori,
  nama_komoditas,
  satuan_subsatuan,
  faktor_pengali,
  satuan_standar
) => {
  let allKomoditi = getKomoditi();
  let komoditi = allKomoditi.filter((item) => item.index == id)[0];

  if (!komoditi) {
    return new Error("not found");
  }

  if (!allKomoditi) {
    return new Error("empty komoditi");
  }

  const updatedKomoditi = {
    ...komoditi,
    kategori,
    nama_komoditas,
    satuan_subsatuan,
    faktor_pengali,
    satuan_standar,
  };

  const res = allKomoditi.map((item) => {
    if (item.index === id) {
      return updatedKomoditi;
    }
    return item;
  });

  if (typeof Storage !== "undefined" && komoditi.is_created_by_user) {
    try {
      localStorage.setItem(
        "komoditi",
        JSON.stringify(res.filter((k) => k.is_created_by_user))
      );
    } catch (e) {
      console.log(e);
    }
  }
  return updatedKomoditi;
};

export const deleteKomoditi = (id) => {
  const komoditi = getKomoditi();
  const res = komoditi.filter((item) => item.index != id);
  if (typeof Storage !== "undefined") {
    try {
      localStorage.setItem("komoditi", JSON.stringify(res));
      return true;
    } catch (e) {
      return false;
    }
  }
  return false;
};
