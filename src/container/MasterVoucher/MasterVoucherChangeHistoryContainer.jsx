"use client";

import { useState } from "react";

import { useGetVoucherChangeHistory } from "@/services/mastervoucher/getVoucherChangeHistory";

import PageTitle from "@/components/PageTitle/PageTitle";

import MasterVoucherChangeHistoryTable from "./MasterVoucherChangeHistoryTable";

const MasterVoucherChangeHistoryContainer = ({ voucherId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Compose params for API
  const params = {
    page: currentPage,
    limit: perPage,
  };

  // Set useFetcherMuatrans to false for now
  const {
    data: apiData,
    error,
    isLoading,
  } = useGetVoucherChangeHistory(voucherId, params, false);

  // Extract data and pagination
  const historyData = apiData?.Data?.data || [];
  const pagination = apiData?.Data?.pagination || {};
  const totalItems = pagination.total || 0;
  const totalPages = pagination.totalPages || 1;

  // Remove search, sort, and order handlers
  const handleFilter = (filters) => {
    // TODO: Implement filter functionality (pass to params if needed)
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="flex h-full flex-col">
      <PageTitle className="mb-6">History Perubahan Data</PageTitle>
      <div className="flex-1">
        <MasterVoucherChangeHistoryTable
          data={historyData}
          loading={isLoading}
          error={error}
          onFilter={handleFilter}
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          perPage={perPage}
        />
      </div>
    </div>
  );
};

export default MasterVoucherChangeHistoryContainer;
