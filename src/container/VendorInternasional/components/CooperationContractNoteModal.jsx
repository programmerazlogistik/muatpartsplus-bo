// src/app/example/cooperation-contract-notes/page.js
"use client";

import React from "react";
import Button from "@/components/Button/Button";
import {
  Modal,
  ModalContent,
  ModalTrigger,
} from "@/components/Modal/Modal";
import { useTranslation } from "@/hooks/use-translation";
import { useGetCooperationContractNotes } from "@/services/vendorInternasional/useGetCooperationContractNotes";


const CooperationContractNotesModal = () => {
  const { t } = useTranslation();
  const { data: contractData, isLoading } = useGetCooperationContractNotes();

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <Modal>
        <ModalTrigger>
          <Button variant="muatparts-primary">
            {t("CooperationContractNotes.buttonViewNotes", {}, "Lihat Catatan")}
          </Button>
        </ModalTrigger>
        <ModalContent className="w-[578px]">
          <div className="p-6">
            <h2 className="mb-4 text-center text-lg font-bold text-neutral-900">
              {t(
                "CooperationContractNotes.title",
                {},
                "Catatan Kontrak Kerjasama"
              )}
            </h2>
            <div className="text-sm font-medium leading-6 text-neutral-600">
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <p>
                  {t(
                    "CooperationContractNotes.content",
                    {},
                    contractData?.notes
                  )}
                </p>
              )}
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CooperationContractNotesModal;