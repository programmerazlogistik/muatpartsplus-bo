import { create } from "zustand";

import { zustandDevtools } from "@/lib/utils";

const defaultValues = {
  tanggalPembuatan: "", // readonly
  kodeVoucher: "",
  syaratDanKetentuan: "",
  caraPemakaian: "",
  jenisPotongan: "Rp x", // "Rp x" or "x %"
  nominal: "",
  maksimalPotonganRp: "",
  minimalTransaksiRp: "",
  periodeAwal: "",
  periodeAkhir: "",
  userWhatsApp: [], // array of user numbers
  kuotaVoucher: "",
  kuotaPerUser: "",
  metodeInstansiTujuanPembayaran: [], // array of payment methods
  status: "Aktif", // "Aktif" or "Tidak Aktif"
  // Route Promo
  lokasiMuat: [],
  lokasiBongkar: [],
  berlakuRuteSebaliknya: false,
};

export const useAddVoucherStore = create(
  zustandDevtools(
    (set, get) => ({
      formValues: defaultValues,
      formErrors: {},
      actions: {
        setField: (field, value) =>
          set((state) => ({
            formValues: { ...state.formValues, [field]: value },
            formErrors: { ...state.formErrors, [field]: undefined },
          })),

        setError: (field, error) =>
          set((state) => ({
            formErrors: { ...state.formErrors, [field]: error },
          })),

        addLokasiMuat: (lokasi) =>
          set((state) => ({
            formValues: {
              ...state.formValues,
              lokasiMuat: Array.isArray(lokasi)
                ? lokasi
                : [...state.formValues.lokasiMuat, lokasi],
            },
          })),

        removeLokasiMuat: (index) =>
          set((state) => ({
            formValues: {
              ...state.formValues,
              lokasiMuat: state.formValues.lokasiMuat.filter(
                (_, i) => i !== index
              ),
            },
          })),

        addLokasiBongkar: (lokasi) =>
          set((state) => ({
            formValues: {
              ...state.formValues,
              lokasiBongkar: Array.isArray(lokasi)
                ? lokasi
                : [...state.formValues.lokasiBongkar, lokasi],
            },
          })),

        removeLokasiBongkar: (index) =>
          set((state) => ({
            formValues: {
              ...state.formValues,
              lokasiBongkar: state.formValues.lokasiBongkar.filter(
                (_, i) => i !== index
              ),
            },
          })),

        addUserWhatsApp: (user) =>
          set((state) => ({
            formValues: {
              ...state.formValues,
              userWhatsApp: [...state.formValues.userWhatsApp, user],
            },
          })),

        removeUserWhatsApp: (index) =>
          set((state) => ({
            formValues: {
              ...state.formValues,
              userWhatsApp: state.formValues.userWhatsApp.filter(
                (_, i) => i !== index
              ),
            },
          })),

        addMetodePembayaran: (metode) =>
          set((state) => ({
            formValues: {
              ...state.formValues,
              metodeInstansiTujuanPembayaran: [
                ...state.formValues.metodeInstansiTujuanPembayaran,
                metode,
              ],
            },
          })),

        removeMetodePembayaran: (index) =>
          set((state) => ({
            formValues: {
              ...state.formValues,
              metodeInstansiTujuanPembayaran:
                state.formValues.metodeInstansiTujuanPembayaran.filter(
                  (_, i) => i !== index
                ),
            },
          })),

        validateForm: () => {
          const { formValues } = get();
          const errors = {};

          // Required field validations
          if (!formValues.kodeVoucher) {
            errors.kodeVoucher = "Kode voucher wajib diisi";
          }

          if (!formValues.syaratDanKetentuan) {
            errors.syaratDanKetentuan = "Syarat dan ketentuan wajib diisi";
          }

          if (!formValues.caraPemakaian) {
            errors.caraPemakaian = "Cara pemakaian wajib diisi";
          }

          if (!formValues.nominal) {
            errors.nominal = "Nominal wajib diisi";
          } else if (
            formValues.jenisPotongan === "x %" &&
            Number(formValues.nominal) > 100
          ) {
            errors.nominal = "Nominal tidak boleh melebihi 100";
          }

          if (
            formValues.jenisPotongan === "Atur Maks. Potongan" &&
            !formValues.maksimalPotonganRp
          ) {
            errors.maksimalPotonganRp = "Maksimal potongan wajib diisi";
          }

          if (
            formValues.jenisPotongan === "Atur Min. Transaksi" &&
            !formValues.minimalTransaksiRp
          ) {
            errors.minimalTransaksiRp = "Minimal transaksi wajib diisi";
          }

          if (!formValues.periodeAwal) {
            errors.periodeAwal = "Periode awal wajib diisi";
          }

          if (!formValues.periodeAkhir) {
            errors.periodeAkhir = "Periode akhir wajib diisi";
          }

          // Validate periode akhir is after periode awal
          if (formValues.periodeAwal && formValues.periodeAkhir) {
            const startDate = new Date(formValues.periodeAwal);
            const endDate = new Date(formValues.periodeAkhir);
            if (endDate < startDate) {
              errors.periodeAkhir =
                "Periode akhir tidak boleh lebih kecil dari periode awal";
            }
          }

          if (formValues.userWhatsApp.length === 0) {
            errors.userWhatsApp = "User WhatsApp wajib diisi";
          }

          if (!formValues.kuotaVoucher) {
            errors.kuotaVoucher = "Kuota voucher wajib diisi";
          }

          if (!formValues.kuotaPerUser) {
            errors.kuotaPerUser = "Kuota per user wajib diisi";
          } else if (
            parseInt(formValues.kuotaPerUser) >
            parseInt(formValues.kuotaVoucher)
          ) {
            errors.kuotaPerUser =
              "Kuota per user tidak boleh lebih besar dari kuota voucher";
          }

          if (formValues.metodeInstansiTujuanPembayaran.length === 0) {
            errors.metodeInstansiTujuanPembayaran =
              "Metode & instansi tujuan pembayaran wajib diisi";
          }

          // Validasi lokasiMuat dan lokasiBongkar
          if (!formValues.lokasiMuat || formValues.lokasiMuat.length === 0) {
            errors.lokasiMuat = "Lokasi muat wajib diisi";
          }
          if (
            !formValues.lokasiBongkar ||
            formValues.lokasiBongkar.length === 0
          ) {
            errors.lokasiBongkar = "Lokasi bongkar wajib diisi";
          }

          set({ formErrors: errors });

          // Return true if no errors
          return Object.keys(errors).length === 0;
        },

        reset: () =>
          set({
            formValues: {
              ...defaultValues,
              tanggalPembuatan: new Date().toISOString().split("T")[0],
            },
            formErrors: {},
          }),
      },
    }),
    {
      name: "add-voucher-store",
    }
  )
);

// Helper hooks
export const useAddVoucherActions = () => {
  const actions = useAddVoucherStore((state) => state.actions);
  return actions;
};

export const useAddVoucherFormValues = () => {
  const formValues = useAddVoucherStore((state) => state.formValues);
  return formValues;
};

export const useAddVoucherFormErrors = () => {
  const formErrors = useAddVoucherStore((state) => state.formErrors);
  return formErrors;
};
