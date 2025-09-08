"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/Button/Button";
import DatePicker from "@/components/DatePicker/DatePicker";
import Checkbox from "@/components/Form/Checkbox";
import { FormContainer, FormLabel } from "@/components/Form/Form";
import Input from "@/components/Form/Input";
import { MyTextArea } from "@/components/Form/TextArea";
import IconComponent from "@/components/IconComponent/IconComponent";
import { LocationSelector } from "@/components/MasterVoucher/LocationSelector";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";
import MultiSelectDropdown from "@/components/MultiSelectDropdown/MultiSelectDropdown";
import PageTitle from "@/components/PageTitle/PageTitle";
import RadioButton from "@/components/Radio/RadioButton";

import {
  useAddVoucherActions,
  useAddVoucherFormErrors,
  useAddVoucherFormValues,
  useAddVoucherStore,
} from "@/store/MasterVoucher/addVoucherStore";

const TambahVoucherPage = () => {
  const router = useRouter();
  const formValues = useAddVoucherFormValues();
  const formErrors = useAddVoucherFormErrors();
  const {
    setField,
    setError,
    validateForm,
    reset,
    addUserWhatsApp,
    removeUserWhatsApp,
    addMetodePembayaran,
    removeMetodePembayaran,
  } = useAddVoucherActions();

  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showConfirmSaveModal, setShowConfirmSaveModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    setField(
      "tanggalPembuatan",
      new Date()
        .toLocaleString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
        .replace(",", "")
    );
  }, [setField]);

  // Handle browser navigation warning
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const hasFormData = Object.values(formValues).some((value) => {
        if (Array.isArray(value)) return value.length > 0;
        return value && value !== "";
      });

      if (hasFormData) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [formValues]);

  const handleSubmit = () => {
    if (validateForm()) {
      setShowConfirmSaveModal(true);
    }
  };

  const handleConfirmSubmit = () => {
    setShowConfirmSaveModal(false);
    // TODO: Submit to API
    console.log("Form submitted:", formValues);
    setShowSuccessModal(true);
  };

  const handleBack = () => {
    // Check if form has data
    const hasFormData = Object.values(formValues).some((value) => {
      if (Array.isArray(value)) return value.length > 0;
      return value && value !== "";
    });

    if (hasFormData) {
      setShowWarningModal(true);
    } else {
      router.push("/master-voucher");
    }
  };

  const handleConfirmNavigation = () => {
    setShowWarningModal(false);
    router.push("/master-voucher");
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    router.push("/master-voucher");
  };

  const userOptions = [
    { value: "081236632731", label: "081236632731" },
    { value: "081234654673", label: "081234654673" },
    { value: "085737737171", label: "085737737171" },
    { value: "085737737172", label: "085737737172" },
    { value: "085737737173", label: "085737737173" },
    { value: "085737737174", label: "085737737174" },
    { value: "085737737175", label: "085737737175" },
    { value: "085737737176", label: "085737737176" },
    { value: "085737737177", label: "085737737177" },
    { value: "085737737178", label: "085737737178" },
  ];

  const paymentMethodOptions = [
    { value: "credit-card-bca", label: "Credit Card - BCA" },
    {
      value: "transfer-virtual-account-bca",
      label: "Transfer Virtual Account - BCA",
    },
    {
      value: "transfer-virtual-account-mandiri",
      label: "Transfer Virtual Account - Mandiri",
    },
    {
      value: "transfer-virtual-account-bri",
      label: "Transfer Virtual Account - BRI",
    },
    {
      value: "transfer-virtual-account-danamon",
      label: "Transfer Virtual Account - Danamon",
    },
    { value: "gopay", label: "GoPay" },
    { value: "shopeepay", label: "ShopeePay" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageTitle showBackButton={true} onBackClick={handleBack}>
        Tambah Voucher
      </PageTitle>

      <div>
        {/* START: Main Form Grid Layout */}
        <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <FormContainer>
              <FormLabel>Tanggal Pembuatan</FormLabel>
              <Input
                value={formValues.tanggalPembuatan}
                readOnly
                appearance={{ inputClassName: " disabled:!text-[#868686]" }}
                disabled
              />
            </FormContainer>

            <FormContainer>
              <FormLabel required>Kode Voucher</FormLabel>
              <Input
                placeholder="Masukkan Kode Voucher"
                value={formValues.kodeVoucher}
                onChange={(e) =>
                  setField("kodeVoucher", e.target.value.toUpperCase())
                }
                errorMessage={formErrors.kodeVoucher}
              />
            </FormContainer>

            <FormContainer>
              <FormLabel required>Syarat dan Ketentuan</FormLabel>
              <MyTextArea
                placeholder="Masukkan Syarat dan Ketentuan"
                value={formValues.syaratDanKetentuan}
                onChange={(e) => setField("syaratDanKetentuan", e.target.value)}
                errorMessage={formErrors.syaratDanKetentuan}
                appearance={{ inputClassName: "min-h-[66px]" }}
              />
            </FormContainer>

            <FormContainer>
              <FormLabel required>Cara Pemakaian</FormLabel>
              <MyTextArea
                placeholder="Masukkan Cara Pemakaian"
                value={formValues.caraPemakaian}
                onChange={(e) => setField("caraPemakaian", e.target.value)}
                errorMessage={formErrors.caraPemakaian}
                appearance={{ inputClassName: "min-h-[66px]" }}
              />
            </FormContainer>

            <FormContainer>
              <FormLabel required>Jenis Potongan</FormLabel>
              <div className="flex gap-4">
                <RadioButton
                  name="jenisPotongan"
                  label="Rp x"
                  value="Rp x"
                  checked={formValues.jenisPotongan === "Rp x"}
                  onChange={(e) => setField("jenisPotongan", e.target.value)}
                />
                <RadioButton
                  name="jenisPotongan"
                  label="x %"
                  value="x %"
                  checked={formValues.jenisPotongan === "x %"}
                  onChange={(e) => setField("jenisPotongan", e.target.value)}
                />
              </div>
            </FormContainer>

            <FormContainer>
              <FormLabel required>Nominal</FormLabel>
              <Input
                placeholder="Masukkan Nominal"
                value={
                  formValues.nominal
                    ? Number(formValues.nominal).toLocaleString("id-ID")
                    : ""
                }
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "");
                  setField("nominal", raw);
                }}
                errorMessage={formErrors.nominal}
              />
            </FormContainer>

            {formValues.jenisPotongan === "x %" && (
              <FormContainer className="items-center !gap-y-0">
                <FormLabel required>Maksimal Potongan (Rp)</FormLabel>
                <div className="flex gap-4">
                  <RadioButton
                    name="maksimalPotongan"
                    label="Tidak Ada"
                    value="Tidak Ada"
                    checked={formValues.maksimalPotonganRp === ""}
                    onChange={() => setField("maksimalPotonganRp", "")}
                  />
                  <RadioButton
                    name="maksimalPotongan"
                    label="Atur Maks. Potongan"
                    value="Atur Maks. Potongan"
                    checked={formValues.maksimalPotonganRp !== ""}
                    onChange={() => setField("maksimalPotonganRp", "0")}
                  />
                </div>
                {formValues.maksimalPotonganRp !== "" && (
                  <>
                    <div></div>
                    <Input
                      placeholder="Masukkan Maks. Potongan"
                      value={
                        formValues.maksimalPotonganRp
                          ? Number(
                              formValues.maksimalPotonganRp
                            ).toLocaleString("id-ID")
                          : ""
                      }
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, "");
                        setField("maksimalPotonganRp", raw);
                      }}
                      className="mt-2"
                      errorMessage={formErrors.maksimalPotonganRp}
                    />
                  </>
                )}
              </FormContainer>
            )}

            <FormContainer className="items-center !gap-y-0">
              <FormLabel required>Minimal Transaksi (Rp)</FormLabel>
              <div className="flex gap-4">
                <RadioButton
                  name="minimalTransaksi"
                  label="Tidak Ada"
                  value="Tidak Ada"
                  checked={formValues.minimalTransaksiRp === ""}
                  onChange={() => setField("minimalTransaksiRp", "")}
                />
                <RadioButton
                  name="minimalTransaksi"
                  label="Atur Min. Transaksi"
                  value="Atur Min. Transaksi"
                  checked={formValues.minimalTransaksiRp !== ""}
                  onChange={() => setField("minimalTransaksiRp", "0")}
                />
              </div>
              {formValues.minimalTransaksiRp !== "" && (
                <>
                  <div></div>
                  <Input
                    placeholder="Masukkan Min. Transaksi"
                    value={
                      formValues.minimalTransaksiRp
                        ? Number(formValues.minimalTransaksiRp).toLocaleString(
                            "id-ID"
                          )
                        : ""
                    }
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, "");
                      setField("minimalTransaksiRp", raw);
                    }}
                    className="mt-2"
                    errorMessage={formErrors.minimalTransaksiRp}
                  />
                </>
              )}
            </FormContainer>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <FormContainer>
              <FormLabel required>Periode Awal</FormLabel>
              <DatePicker
                placeholder="dd/mm/yyyy"
                value={
                  formValues.periodeAwal
                    ? new Date(formValues.periodeAwal)
                    : null
                }
                onChange={(date) =>
                  setField(
                    "periodeAwal",
                    date?.toISOString().split("T")[0] || ""
                  )
                }
                errorMessage={formErrors.periodeAwal}
                iconPosition="right"
              />
            </FormContainer>

            <FormContainer>
              <FormLabel required>Periode Akhir</FormLabel>
              <DatePicker
                placeholder="dd/mm/yyyy"
                value={
                  formValues.periodeAkhir
                    ? new Date(formValues.periodeAkhir)
                    : null
                }
                onChange={(date) =>
                  setField(
                    "periodeAkhir",
                    date?.toISOString().split("T")[0] || ""
                  )
                }
                minDate={
                  formValues.periodeAwal
                    ? new Date(formValues.periodeAwal)
                    : undefined
                }
                errorMessage={formErrors.periodeAkhir}
                iconPosition="right"
              />
            </FormContainer>

            <FormContainer>
              <FormLabel required>User (No. WhatsApp)</FormLabel>
              <MultiSelectDropdown
                options={userOptions}
                selectedItems={formValues.userWhatsApp}
                placeholder="Pilih User"
                searchPlaceholder="Cari User"
                onSelectionChange={(selectedUsers) => {
                  setField("userWhatsApp", selectedUsers);
                }}
                titleModal="User (No. WhatsApp)"
                errorMessage={formErrors.userWhatsApp}
                showAllOption={true}
              />
            </FormContainer>

            <FormContainer>
              <FormLabel required>Kuota Voucher</FormLabel>
              <Input
                type="text"
                placeholder="Masukkan Kuota Voucher"
                value={
                  formValues.kuotaVoucher
                    ? Number(formValues.kuotaVoucher).toLocaleString("id-ID")
                    : ""
                }
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "");
                  setField("kuotaVoucher", raw);
                }}
                min={1}
                errorMessage={formErrors.kuotaVoucher}
              />
            </FormContainer>

            <FormContainer>
              <FormLabel required>Kuota per User</FormLabel>
              <Input
                type="text"
                placeholder="Masukkan Kuota per User"
                value={
                  formValues.kuotaPerUser
                    ? Number(formValues.kuotaPerUser).toLocaleString("id-ID")
                    : ""
                }
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "");
                  setField("kuotaPerUser", raw);
                }}
                min={1}
                errorMessage={formErrors.kuotaPerUser}
              />
            </FormContainer>

            <FormContainer>
              <FormLabel required>
                Metode & Instansi Tujuan Pembayaran
              </FormLabel>
              <MultiSelectDropdown
                options={paymentMethodOptions}
                selectedItems={formValues.metodeInstansiTujuanPembayaran}
                placeholder="Pilih Metode & Instansi Tujuan Pembayaran"
                searchPlaceholder="Cari Metode & Instansi Tujuan"
                onSelectionChange={(selectedMethods) => {
                  setField("metodeInstansiTujuanPembayaran", selectedMethods);
                }}
                titleModal="Metode & Instansi Tujuan Pembayaran"
                errorMessage={formErrors.metodeInstansiTujuanPembayaran}
                showAllOption={true}
              />
            </FormContainer>

            <FormContainer className="items-center">
              <FormLabel required>Status</FormLabel>
              <div className="flex gap-4">
                <RadioButton
                  name="status"
                  label="Aktif"
                  value="Aktif"
                  checked={formValues.status === "Aktif"}
                  onChange={(e) => setField("status", e.target.value)}
                />
                <RadioButton
                  name="status"
                  label="Tidak Aktif"
                  value="Tidak Aktif"
                  checked={formValues.status === "Tidak Aktif"}
                  onChange={(e) => setField("status", e.target.value)}
                />
              </div>
            </FormContainer>
          </div>
        </div>
        <div className="pt-6">
          <h3 className="mb-4 font-bold text-gray-900">Rute Promo</h3>

          <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
            <FormContainer>
              <FormLabel required>Lokasi Muat</FormLabel>
              <LocationSelector
                title="Provinsi & Kota/Kabupaten Lokasi Muat*"
                placeholder="Pilih Kota/Kabupaten"
                selectedLocations={formValues.lokasiMuat}
                onSelectionChange={(locations) =>
                  setField("lokasiMuat", locations)
                }
                errorMessage={formErrors.lokasiMuat}
              />
            </FormContainer>

            <FormContainer>
              <FormLabel required>Lokasi Bongkar</FormLabel>
              <LocationSelector
                title="Provinsi & Kota/Kabupaten Lokasi Bongkar*"
                placeholder="Pilih Kota/Kabupaten"
                selectedLocations={formValues.lokasiBongkar}
                onSelectionChange={(locations) =>
                  setField("lokasiBongkar", locations)
                }
                errorMessage={formErrors.lokasiBongkar}
              />
            </FormContainer>
          </div>

          <div className="mt-6">
            <FormContainer className="items-center !gap-y-0">
              <FormLabel>Berlaku Rute Sebaliknya</FormLabel>
              <Checkbox
                checked={formValues.berlakuRuteSebaliknya}
                onChange={({ checked }) =>
                  setField("berlakuRuteSebaliknya", checked)
                }
              />
            </FormContainer>
          </div>
        </div>

        <div className="mt-6 flex justify-center pt-2">
          <Button onClick={handleSubmit} className="px-8">
            Buat Voucher
          </Button>
        </div>
      </div>
      <ConfirmationModal
        isOpen={showWarningModal}
        setIsOpen={setShowWarningModal}
        closeOnOutsideClick
        size="small"
        variant="muatparts"
        title={{
          text: "Warning",
          className: "",
        }}
        description={{
          text: "Apakah kamu yakin ingin berpindah halaman? Data yang telah diisi tidak akan disimpan",
          className: "",
        }}
        cancel={{
          text: "Batal",
          onClick: () => setShowWarningModal(false),
        }}
        confirm={{
          text: "Ya",
          onClick: handleConfirmNavigation,
        }}
      />
      <ConfirmationModal
        isOpen={showConfirmSaveModal}
        setIsOpen={setShowConfirmSaveModal}
        size="small"
        variant="muatparts"
        closeOnOutsideClick
        title={{
          text: "Pemberitahuan",
          className: "",
        }}
        description={{
          text: "Apakah Anda yakin ingin menyimpan data?",
          className: "",
        }}
        cancel={{
          text: "Tidak",
          onClick: () => setShowConfirmSaveModal(false),
        }}
        confirm={{
          text: "Ya",
          onClick: handleConfirmSubmit,
        }}
      />
      <ConfirmationModal
        isOpen={showSuccessModal}
        setIsOpen={handleSuccessModalClose}
        size="small"
        variant="muatparts"
        closeOnOutsideClick={true}
        withButtons={false}
        title={{
          text: "Pemberitahuan",
          className: "",
        }}
        description={{
          text: "Data berhasil disimpan.",
          className: "",
        }}
      />
    </div>
  );
};

export default TambahVoucherPage;
