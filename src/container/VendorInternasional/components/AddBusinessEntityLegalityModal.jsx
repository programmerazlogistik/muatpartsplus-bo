import React, { useState } from "react";
import Button from "@/components/Button/Button";
import FileUpload from "@/components/FileUpload/FileUpload";
import { FormContainer, FormLabel } from "@/components/Form/Form";
import {
  Modal,
  ModalContent,
  ModalTrigger,
} from "@/components/Modal/Modal";
import { useTranslation } from "@/hooks/use-translation";

const AddBusinessEntityLegalityModal = () => {
  const { t } = useTranslation();
  const [businessLicense, setBusinessLicense] = useState(null);
  const [registrationCertificate, setRegistrationCertificate] = useState(null);

  const fileUploadHelperText = t(
    "addBusinessEntityLegality.helperTextFileUpload",
    {},
    "Format file jpg/png/pdf/zip max. 5MB"
  );

  return (
    <div className="p-8">
      <Modal>
        <ModalTrigger>
          <Button variant="muatparts-primary">
            {t("addBusinessEntityLegality.triggerButton", {}, "Tambah Legalitas")}
          </Button>
        </ModalTrigger>
        <ModalContent className="w-[578px]">
          <div className="flex flex-col p-6">
            <h2 className="mb-6 text-center text-lg font-bold text-neutral-900">
              {t(
                "addBusinessEntityLegality.title",
                {},
                "Tambah Business Entity Legality"
              )}
            </h2>

            <div className="flex flex-col gap-4">
              <FormContainer>
                <FormLabel required>
                  {t(
                    "addBusinessEntityLegality.labelBusinessLicense",
                    {},
                    "Business License (USCI / USCC)"
                  )}
                </FormLabel>
                <FileUpload
                  value={businessLicense}
                  onSuccess={(file) => setBusinessLicense(file)}
                  onError={(err) => console.error("File upload error:", err)}
                  maxSize={5}
                  acceptedFormats={[".jpg", ".jpeg", ".png", ".pdf", ".zip"]}
                  placeholderText={t("addBusinessEntityLegality.buttonUpload", {}, "Unggah")}
                />
                <p className="mt-1 text-sm text-neutral-500">
                  {fileUploadHelperText}
                </p>
              </FormContainer>

              <FormContainer>
                <FormLabel required>
                  {t(
                    "addBusinessEntityLegality.labelRegistrationCertificate",
                    {},
                    "Company Registration Certificate"
                  )}
                </FormLabel>
                <FileUpload
                  value={registrationCertificate}
                  onSuccess={(file) => setRegistrationCertificate(file)}
                  onError={(err) => console.error("File upload error:", err)}
                  maxSize={5}
                  acceptedFormats={[".jpg", ".jpeg", ".png", ".pdf", ".zip"]}
                  placeholderText={t("addBusinessEntityLegality.buttonUpload", {}, "Unggah")}
                />
                 <p className="mt-1 text-sm text-neutral-500">
                  {fileUploadHelperText}
                </p>
              </FormContainer>
            </div>

            <div className="mt-8 flex justify-center">
              <Button variant="muatparts-primary" className="w-[120px]">
                {t("addBusinessEntityLegality.buttonSave", {}, "Simpan")}
              </Button>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddBusinessEntityLegalityModal;