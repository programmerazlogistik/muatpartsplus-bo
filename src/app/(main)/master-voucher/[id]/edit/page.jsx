"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/Button/Button";
import LoadingStatic from "@/components/Loading/LoadingStatic";
import VoucherForm from "@/components/MasterVoucher/VoucherForm";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";
import PageTitle from "@/components/PageTitle/PageTitle";

import {
  useAddVoucherActions,
  useAddVoucherFormValues,
} from "@/store/MasterVoucher/addVoucherStore";

const fetchVoucherById = async (id) => {
  console.log(`Fetching data for voucher ID: ${id}`);
  return {
    tanggalPembuatan: "03/07/2023 15:27",
    kodeVoucher: "WEEKENDHEMAT15",
    syaratDanKetentuan:
      "Nikmati diskon 15% hingga maksimal Rp100.000 untuk setiap transaksi pengiriman! Jangan lewatkan kesempatan hemat ini. Berlaku untuk semua pengguna, pastikan kamu menggunakan kesempatan ini sebelum promo berakhir!",
    caraPemakaian:
      "Nikmati diskon 15% hingga maksimal Rp100.000 untuk setiap transaksi pengiriman! Jangan lewatkan kesempatan hemat ini. Berlaku untuk semua pengguna, pastikan kamu menggunakan kesempatan ini sebelum promo berakhir!",
    jenisPotongan: "x %",
    nominal: "15",
    maksimalPotonganRp: "100000",
    minimalTransaksiRp: "1000000",
    periodeAwal: "2023-07-04",
    periodeAkhir: "2024-07-03",
    kuotaVoucher: "1000",
    kuotaPerUser: "3",
    userWhatsApp: [
      {
        value: "081236632731",
        label: "081236632731",
      },
      {
        value: "081234654673",
        label: "081234654673",
      },
      {
        value: "085737737171",
        label: "085737737171",
      },
      {
        value: "085737737172",
        label: "085737737172",
      },
      {
        value: "085737737173",
        label: "085737737173",
      },
      {
        value: "085737737174",
        label: "085737737174",
      },
      {
        value: "085737737175",
        label: "085737737175",
      },
      {
        value: "085737737176",
        label: "085737737176",
      },
      {
        value: "085737737177",
        label: "085737737177",
      },
      {
        value: "085737737178",
        label: "085737737178",
      },
    ],
    metodeInstansiTujuanPembayaran: [
      {
        value: "credit-card-bca",
        label: "Credit Card - BCA",
      },
      {
        value: "transfer-virtual-account-mandiri",
        label: "Transfer Virtual Account - Mandiri",
      },
      {
        value: "transfer-virtual-account-danamon",
        label: "Transfer Virtual Account - Danamon",
      },
      {
        value: "transfer-virtual-account-bca",
        label: "Transfer Virtual Account - BCA",
      },
    ],
    status: "Aktif",
    lokasiMuat: [
      "Jawa Timur - Kab. Jember",
      "Jawa Timur - Kab. Madiun",
      "Jawa Timur - Kab. Malang",
    ],
    lokasiBongkar: [
      "DKI Jakarta - Kota Jakarta Pusat",
      "DKI Jakarta - Kota Jakarta Barat",
      "DKI Jakarta - Kota Jakarta Selatan",
      "DKI Jakarta - Kota Jakarta Timur",
      "DKI Jakarta - Kota Jakarta Utara",
      "DKI Jakarta - Kab. Kepulauan Seribu",
    ],
    berlakuRuteSebaliknya: true,
  };
};

const UbahVoucherPage = () => {
  const router = useRouter();
  const params = useParams();
  const formValues = useAddVoucherFormValues();
  const { setFormValues, validateForm } = useAddVoucherActions();

  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmSaveModal, setShowConfirmSaveModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  // Note: Warning modal for navigation is omitted for brevity but can be added like in the "add" page.

  useEffect(() => {
    const loadVoucherData = async () => {
      const id = params.id;
      if (id) {
        setIsLoading(true);
        // TODO: Replace with actual API call
        const data = await fetchVoucherById(id);
        setFormValues(data);
        setIsLoading(false);
      }
    };
    loadVoucherData();
  }, [params.id, setFormValues]);

  const handleSubmit = () => {
    if (validateForm()) {
      setShowConfirmSaveModal(true);
    }
  };

  const handleConfirmSubmit = () => {
    setShowConfirmSaveModal(false);
    // TODO: Submit to API for UPDATING the voucher
    console.log("Form submitted for update:", formValues);
    setShowSuccessModal(true);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    router.push("/master-voucher");
  };

  if (isLoading) {
    return <LoadingStatic />;
  }

  return (
    <div className="space-y-6">
      <div className="flex w-full items-center justify-between">
        <PageTitle
          showBackButton={true}
          onBackClick={() => router.push("/master-voucher")}
          className="!mb-0"
        >
          Ubah Voucher
        </PageTitle>
        <Button
          variant="muatparts-primary"
          onClick={() =>
            router.push(`/master-voucher/${params.id}/change-history`)
          }
        >
          Lihat History Perubahan
        </Button>
      </div>

      <VoucherForm mode="edit" />

      <div className="mt-6 flex justify-center pt-2">
        <Button onClick={handleSubmit} className="px-8">
          Simpan
        </Button>
      </div>

      {/* Modals */}
      <ConfirmationModal
        isOpen={showConfirmSaveModal}
        setIsOpen={setShowConfirmSaveModal}
        title={{ text: "Pemberitahuan" }}
        description={{
          text: "Apakah Anda yakin ingin menyimpan perubahan data?",
        }}
        cancel={{
          text: "Tidak",
          onClick: () => setShowConfirmSaveModal(false),
        }}
        confirm={{ text: "Ya", onClick: handleConfirmSubmit }}
      />
      <ConfirmationModal
        isOpen={showSuccessModal}
        setIsOpen={handleSuccessModalClose}
        withButtons={false}
        title={{ text: "Pemberitahuan" }}
        description={{ text: "Data berhasil diperbarui." }}
      />
    </div>
  );
};

export default UbahVoucherPage;
