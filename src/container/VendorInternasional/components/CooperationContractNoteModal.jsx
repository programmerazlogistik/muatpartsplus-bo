"use client";

import { Modal, ModalContent, ModalTrigger } from "@muatmuat/ui/Modal";

import { useGetCooperationContractNotes } from "@/services/vendorInternasional/useGetCooperationContractNotes";

import Button from "@/components/Button/Button";

const CooperationContractNotesModal = () => {
  const { data: contractData, isLoading } = useGetCooperationContractNotes();

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <Modal>
        <ModalTrigger>
          <Button variant="muatparts-primary">"Lihat Catatan"</Button>
        </ModalTrigger>
        <ModalContent className="w-[578px]">
          <div className="p-6">
            <h2 className="mb-4 text-center text-lg font-bold text-neutral-900">
              "Catatan Kontrak Kerjasama"
            </h2>
            <div className="text-sm font-medium leading-6 text-neutral-600">
              {isLoading ? <p>Loading...</p> : <p>{contractData?.notes}</p>}
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CooperationContractNotesModal;
