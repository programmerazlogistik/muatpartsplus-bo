interface DriverStatusItem {
  code: string;
  name: string;
}

interface DriverStatusCategory {
  [key: string]: DriverStatusItem;
}

interface DriverStatusStructure {
  LOADING: DriverStatusCategory;
  UNLOADING: DriverStatusCategory;
  FLEET_CHANGE: DriverStatusCategory;
}

export const DriverStatusEnum: DriverStatusStructure = {
  LOADING: {
    MENUJU: {
      code: "MENUJU_KE_LOKASI_MUAT",
      name: "labelMenujuKeLokasiMuat",
    },
    TIBA: {
      code: "TIBA_DI_LOKASI_MUAT",
      name: "labelTibaDiLokasiMuat",
    },
    ANTRI: {
      code: "ANTRI_DI_LOKASI_MUAT",
      name: "labelAntriDiLokasiMuat",
    },
    MUAT: {
      code: "SEDANG_MUAT",
      name: "TrackingStatus.loading",
    },
    MUAT_MULTIPLE: {
      code: "SEDANG_MUAT_MULTIPLE",
      name: "DriverStatusEnum.labelSedangMuatDiLokasi",
    },
  },
  UNLOADING: {
    MENUJU: {
      code: "MENUJU_KE_LOKASI_BONGKAR",
      name: "labelMenujuKeLokasiBongkar",
    },
    TIBA: {
      code: "TIBA_DI_LOKASI_BONGKAR",
      name: "labelTibaDiLokasiBongkar",
    },
    ANTRI: {
      code: "ANTRI_DI_LOKASI_BONGKAR",
      name: "labelAntriDiLokasiBongkar",
    },
    BONGKAR: {
      code: "SEDANG_BONGKAR",
      name: "labelSedangBongkar",
    },
    BONGKAR_MULTIPLE: {
      code: "SEDANG_BONGKAR_MULTIPLE",
      name: "DriverStatusEnum.labelSedangBongkarDiLokasi",
    },
    SELESAI: {
      code: "PENGIRIMAN_MUATAN_SELESAI",
      name: "labelPengirimanMuatanSelesai",
    },
  },
  FLEET_CHANGE: {
    MENUNGGU: {
      code: "MENUNGGU_ARMADA_PENGGANTI",
      name: "labelMenungguArmadaPengganti",
    },
    PINDAH: {
      code: "MUATAN_PINDAH_ARMADA",
      name: "labelMuatanPindahArmada",
    },
    JALAN: {
      code: "ARMADA_PENGGANTI_BERJALAN",
      name: "labelArmadaPenggantiBerjalan",
    },
  },
};

export const DriverStatusLabel = Object.values(DriverStatusEnum)
  .flatMap((category) => Object.values(category))
  .reduce<Record<string, string>>((acc, status: DriverStatusItem) => {
    acc[status.code] = status.name;
    return acc;
  }, {});

export const DriverStatusScanEnum = {
  BELUM_SCAN_MUAT: "BELUM_SCAN_MUAT",
  SUDAH_SCAN_MUAT: "SUDAH_SCAN_MUAT",
  BELUM_SCAN_BONGKAR: "BELUM_SCAN_BONGKAR",
  SUDAH_SCAN_BONGKAR: "SUDAH_SCAN_BONGKAR",
};
