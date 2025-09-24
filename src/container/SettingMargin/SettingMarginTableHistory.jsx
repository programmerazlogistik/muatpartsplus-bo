"use client";
import { useState, useMemo } from "react";
import DataTableBO from "@/components/DataTableBO/DataTableBO";
import { useGetMarginHistory, transformMarginHistoryToTableData } from "@/services/masterpricing/settingMargin/getMarginHistory";

export default function SettingMarginTableHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  // Get margin history data from API
  const { data, error, isLoading } = useGetMarginHistory({
    search: searchQuery,
    page: currentPage,
    limit: perPage
  });

  
  // Transform API data to table format
  const historyData = useMemo(() => {
    if (!data?.data?.Data) return [];
    // Check if data is array or has margins property
    const dataArray = Array.isArray(data.data.Data) ? data.data.Data : data.data.Data.margins || [];
    return transformMarginHistoryToTableData(dataArray);
  }, [data]);

  // Get pagination info from API
  const pagination = data?.data?.Pagination || data?.data?.Data?.pagination || {};
  const totalData = pagination.totalRecords || 0;
  const totalPages = pagination.totalPages || 1;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Show error state if API failed
  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-500">Gagal memuat data history. Silakan coba lagi.</div>
      </div>
    );
  }

  const columns = [
    {
      key: "createdAtFormatted",
      header: "Waktu Update",
      headerClassName: "text-center",
      sortable: false,
      render: (row) => (
        <div className="text-sm text-gray-900 p-0">{row.createdAtFormatted}</div>
      ),
    },
    {
      key: "actionFormatted",
      header: "Aktivitas",
      sortable: false,
      render: (row) => (
        <div className="text-sm text-gray-900 p-0">{row.actionFormatted}</div>
      ),
    },
    {
      key: "createdBy",
      header: "User",
      sortable: false,
      render: (row) => <div className="text-sm text-gray-900 p-0">{row.createdBy}</div>,
    },
    {
      key: "percentageFormatted",
      header: "Margin",
      sortable: false,
      render: (row) => (
        <div className="text-sm text-gray-900 p-0">{row.percentageFormatted}</div>
      ),
    },
    {
      key: "modelFormatted",
      header: "Model Margin",
      sortable: false,
      render: (row) => (
        <div className="text-sm text-gray-900 max-w-xs p-0">{row.modelFormatted}</div>
      ),
    },
    {
      key: "validFromFormatted",
      header: "Berlaku Mulai",
      sortable: false,
      render: (row) => (
        <div className="text-sm text-gray-900 p-0">{row.validFromFormatted}</div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <DataTableBO
        columns={columns}
        data={historyData}
        loading={isLoading}
        searchPlaceholder="Cari berdasarkan user, aktivitas, atau model margin..."
        onSearch={handleSearch}
        showSearch={false}
        onFilter={null}
        onSort={null}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalData}
        perPage={perPage}
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