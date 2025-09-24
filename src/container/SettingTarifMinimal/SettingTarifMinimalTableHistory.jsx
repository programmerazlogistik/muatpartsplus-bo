"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import DataTableBO from "@/components/DataTableBO/DataTableBO";
import { useGetMinRatesHistory, transformMinRatesHistoryToTableData, transformPaginationData } from "@/services/masterpricing/settingMinimumRate/getMinRatesHistory";

export default function SettingTarifMinimalTableHistory() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Get history data from API
  const { data: apiResponse, error, isLoading } = useGetMinRatesHistory({
    search: searchTerm,
    page: currentPage,
    limit: perPage
  });

  // Transform API data for table
  const historyData = apiResponse?.data?.Data?.data ? 
    transformMinRatesHistoryToTableData(apiResponse.data.Data.data) : [];
  
  const pagination = apiResponse?.data?.Data?.pagination ? 
    transformPaginationData(apiResponse.data.Data.pagination) : {};

  // Use API data directly (search and pagination handled by API)
  const filteredData = historyData;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleViewDetail = (id) => {
    console.log("View detail for ID:", id);
    // Implement view detail logic
  };

  const columns = [
    {
      key: "updateTime",
      header: "Waktu Update",
      className: "text-center",
      headerClassName: "text-center",
      width: "200px",
      sortable: false,
      render: (row) => (
        <div className="text-center">
          <div className="font-xs font-semibold">{row.createdAtFormatted}</div>
        </div>
      )
    },
    {
      key: "activity",
      header: "Aktivitas",
      sortable: false,
      render: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium`}>
          {row.action === "CREATE" ? "Create" : 
           row.action === "UPDATE" ? "Update" : 
           row.action === "DELETE" ? "Delete" : 
           row.action}
        </span>
      )
    },
    {
      key: "user",
      header: "User",
      sortable: false,
      render: (row) => (
        <span className="font-medium">{row.createdBy || row.updatedBy || 'Unknown'}</span>
      )
    },
    {
      key: "action",
      header: "Aksi",
      sortable: false,
      render: (row) => (
        <button
          onClick={() => (router.push(`/master-pricing/setting-tarif-minimal/${row.id}/detail`))}
          className="text-blue-600 hover:text-blue-800 underline text-xs font-semibold"
        >
          Lihat Detail Perubahan
        </button>
      )
    }
  ];

  return (
    <div>
      <DataTableBO
        columns={columns}
        data={filteredData}
        loading={isLoading}
        searchPlaceholder="Cari berdasarkan aktivitas, user, atau waktu..."
        onSearch={handleSearch}
        showSearch={false}
        onFilter={null}
        onSort={null}
        currentPage={pagination.currentPage || currentPage}
        totalPages={pagination.totalPages || 1}
        totalItems={pagination.totalRecords || 0}
        perPage={pagination.recordsPerPage || perPage}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
        showFilter={false}
        showPagination={true}
        showTotalCount={true}
        totalCountLabel="data"
        className="my-[10px]"
        emptyState={
          <div className="flex h-[66px] items-center justify-center">
            <p className="text-xs font-semibold text-[#868686]">
              Belum ada data history
            </p>
          </div>
        }
      />
    </div>
  );
}