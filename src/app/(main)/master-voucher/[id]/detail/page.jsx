"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import Button from "@/components/Button/Button";
import LoadingStatic from "@/components/Loading/LoadingStatic";
import VoucherForm from "@/components/MasterVoucher/VoucherForm";
import PageTitle from "@/components/PageTitle/PageTitle";

import { MasterVoucherUsageHistoryContainer } from "@/container/MasterVoucher";

import { useGetVoucherDetail, transformVoucherDetailToFormValues } from "@/services/mastervoucher/getVoucherDetail";

import { useAddVoucherActions } from "@/store/MasterVoucher/addVoucherStore";

const DetailVoucherPage = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const view = searchParams.get("view");
  const { setFormValues } = useAddVoucherActions();

  // Use SWR hook to fetch voucher detail
  const {
    data: apiResponse,
    error,
    isLoading,
    mutate,
  } = useGetVoucherDetail(params.id, {
    // Only fetch if we have a valid ID
    revalidateOnMount: !!params.id
  });

  // Transform and set form values when data is loaded
  useEffect(() => {
    if (apiResponse?.data?.Data) {
      const transformedData = transformVoucherDetailToFormValues(apiResponse.data.Data);
      setFormValues(transformedData);
    }
  }, [apiResponse, setFormValues]);

  // Handle loading state
  if (isLoading) {
    return <LoadingStatic />;
  }

  // Handle error state
  if (error) {
    console.error("Error fetching voucher detail:", error);
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Failed to load voucher details</p>
          <Button onClick={() => mutate()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex w-full items-center justify-between">
        <PageTitle
          showBackButton={true}
          onBackClick={() => router.push("/master-voucher")}
          className="!mb-0"
        >
          Detail Voucher
        </PageTitle>
        {view !== "usage-history" && (
          <Button
            variant="muatparts-primary"
            onClick={() =>
              router.push(`/master-voucher/${params.id}/change-history`)
            }
          >
            Lihat History Perubahan
          </Button>
        )}
      </div>
      <VoucherForm mode="detail" />
      {view === "usage-history" && (
        <MasterVoucherUsageHistoryContainer voucherId={params.id} />
      )}
    </div>
  );
};

export default DetailVoucherPage;
