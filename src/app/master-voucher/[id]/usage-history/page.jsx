"use client";

import { useParams } from "next/navigation";

import MasterVoucherUsageHistoryContainer from "@/container/MasterVoucher/MasterVoucherUsageHistoryContainer";

import AppLayout from "@/layouts/AppLayout";

const MasterVoucherUsageHistoryPage = () => {
  const params = useParams();
  const voucherId = params.id;

  return (
    <AppLayout>
      <MasterVoucherUsageHistoryContainer voucherId={voucherId} />
    </AppLayout>
  );
};

export default MasterVoucherUsageHistoryPage;
