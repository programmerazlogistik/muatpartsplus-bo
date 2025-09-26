import React from "react";
import Button from "@/components/Button/Button";
import DatetimePicker from "@/components/DatetimePicker/DatetimePicker";
import FileUpload from "@/components/FileUpload/FileUpload";
import { FormLabel } from "@/components/Form/Form";
import TextArea from "@/components/TextArea/TextArea";
import { useTranslation } from "@/hooks/use-translation";

// A generic Input component as it is a standard form element.
const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    className={`w-full rounded-md border border-neutral-300 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-700/50 disabled:cursor-not-allowed disabled:bg-neutral-200 ${className}`}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";

export const AddNewContactModal = () => {
  const { t } = useTranslation();
  const [file, setFile] = React.useState(null);
  const [date, setDate] = React.useState();

  return (
    <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-center text-xl font-bold text-neutral-900">
        {t(
          "TambahKontrakBaru.title",
          {},
          "Tambah Kontrak Baru"
        )}
      </h1>

      <div className="space-y-4">
        <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-3 md:gap-4">
          <FormLabel required className="md:text-right">
            {t(
              "TambahKontrakBaru.labelNomorPerjanjian",
              {},
              "Nomor Perjanjian Kerjasama"
            )}
          </FormLabel>
          <div className="md:col-span-2">
            <Input
              placeholder={t(
                "TambahKontrakBaru.placeholderNomorPerjanjian",
                {},
                "Masukkan Nomor Perjanjian Kerjasama"
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-2 md:grid-cols-3 md:gap-4">
          <FormLabel required className="md:text-right md:pt-2">
            {t("TambahKontrakBaru.labelPerjanjian", {}, "Perjanjian Kerjasama")}
          </FormLabel>
          <div className="md:col-span-2">
            <FileUpload
              value={file}
              onSuccess={setFile}
              maxSize={5}
              acceptedFormats={[".jpg", ".png", ".pdf", ".zip"]}
              variant="button"
              buttonText={t("TambahKontrakBaru.buttonUnggah", {}, "Unggah")}
              descriptionText={t(
                "TambahKontrakBaru.helpTextFormatFile",
                {},
                "Format file jpg/png/pdf/zip max. 5MB"
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-2 md:grid-cols-3 md:gap-4">
          <FormLabel required className="md:text-right md:pt-2">
            {t("TambahKontrakBaru.labelCatatan", {}, "Catatan Kerjasama")}
          </FormLabel>
          <div className="md:col-span-2">
            <TextArea
              placeholder={t(
                "TambahKontrakBaru.placeholderCatatan",
                {},
                "Masukkan Catatan"
              )}
              className="min-h-[80px]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-3 md:gap-4">
          <FormLabel required className="md:text-right">
            {t("TambahKontrakBaru.labelTanggal", {}, "Tanggal Kerjasama")}
          </FormLabel>
          <div className="md:col-span-2">
            <DatetimePicker
              placeholder={t(
                "TambahKontrakBaru.placeholderTanggal",
                {},
                "Pilih Tanggal"
              )}
              datetimeValue={date}
              onApply={(newDate) => setDate(newDate)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-3 md:gap-4">
          <FormLabel required className="md:text-right">
            {t(
              "TambahKontrakBaru.labelJangkaKontrak",
              {},
              "Jangka Lama Kontrak"
            )}
          </FormLabel>
          <div className="relative md:col-span-2">
            <Input
              type="number"
              placeholder={t(
                "TambahKontrakBaru.placeholderJangkaKontrak",
                {},
                "Masukkan Jangka Lama Kontrak"
              )}
              className="pr-16"
            />
            <span className="absolute inset-y-0 right-4 flex items-center text-sm font-medium text-neutral-700">
              {t("TambahKontrakBaru.labelTahun", {}, "Tahun")}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button className="w-full max-w-xs">
          {t("TambahKontrakBaru.buttonSimpan", {}, "Simpan")}
        </Button>
      </div>
    </div>
  );
};