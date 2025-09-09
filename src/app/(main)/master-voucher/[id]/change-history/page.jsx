"use client";

import { useParams } from "next/navigation";

import MasterVoucherChangeHistoryContainer from "@/container/MasterVoucher/MasterVoucherChangeHistoryContainer";

const MasterVoucherChangeHistoryPage = () => {
  const params = useParams();
  const voucherId = params.id;

  return <MasterVoucherChangeHistoryContainer voucherId={voucherId} />;
};

export default MasterVoucherChangeHistoryPage;
