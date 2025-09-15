"use client";

import { useMemo, useState } from "react";

import { useVoucherUsageHistory } from "@/services/mastervoucher/getVoucherUsageHistory";

import PageTitle from "@/components/PageTitle/PageTitle";

import MasterVoucherUsageHistoryTable from "./MasterVoucherUsageHistoryTable";

const MasterVoucherUsageHistoryContainer = ({ voucherId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ sort: null, order: null });

  const params = useMemo(
    () => ({
      page: currentPage,
      limit: perPage,
    }),
    [currentPage, perPage]
  );

  const {
    data: apiData,
    error,
    isLoading,
  } = useVoucherUsageHistory(voucherId, params);

  const rawData = apiData?.data?.Data?.data || [];
  const data = rawData.map((item) => ({
    id: item.id,
    userId: item.userId,
    companyName: item.userName || "-",
    phoneNumber: item.userPhone || "-",
    emailUser: item.userEmail || "-",
    paymentDate: item.usageDate
      ? new Date(item.usageDate).toLocaleDateString("id-ID")
      : "-",
    invoiceNumber: item.invoiceNumber,
    claimValue: `Rp${item.discountAmount?.toLocaleString("id-ID") || "0"}`,
  }));
  const pagination = apiData?.data?.Data?.pagination || {};
  const totalPages = pagination.totalPages || 1;
  const totalItems = pagination.total || 0;
  const loading = isLoading;

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilter = (filters) => {
    // TODO: Implement filter functionality
  };

  const handleSort = (sort, order) => {
    setSortConfig({ sort, order });
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
      <PageTitle withBack={false} className="mb-6">
        History Pemakaian Voucher
      </PageTitle>

      <div className="flex-1">
        <MasterVoucherUsageHistoryTable
          data={data}
          loading={loading}
          onSearch={handleSearch}
          onFilter={handleFilter}
          onSort={handleSort}
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

export default MasterVoucherUsageHistoryContainer;
