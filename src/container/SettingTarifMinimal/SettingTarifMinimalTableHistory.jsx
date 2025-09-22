"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import DataTableBO from "@/components/DataTableBO/DataTableBO";

export default function SettingTarifMinimalTableHistory() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for history
  const historyData = [
    {
      id: 1,
      updateTime: "08/07/2023",
      updateTimeDetail: "10:50 WIB",
      activity: "Update",
      user: "John",
      action: "Lihat Detail Perubahan"
    },
    {
      id: 2,
      updateTime: "07/07/2023",
      updateTimeDetail: "14:30 WIB",
      activity: "Create",
      user: "Jane",
      action: "Lihat Detail Perubahan"
    },
    {
      id: 3,
      updateTime: "06/07/2023",
      updateTimeDetail: "09:15 WIB",
      activity: "Update",
      user: "Bob",
      action: "Lihat Detail Perubahan"
    }
  ];

  // Filter data based on search term
  const filteredData = historyData.filter(item =>
    item.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.updateTime.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate data
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

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
          <div className="font-xs font-semibold">{row.updateTime}</div>
          <div className="text-xs font-semibold">{row.updateTimeDetail}</div>
        </div>
      )
    },
    {
      key: "activity",
      header: "Aktivitas",
      sortable: false,
      render: (row) => (
        <span className="text-xs font-medium p-0">
          {row.activity}
        </span>
      )
    },
    {
      key: "user",
      header: "User",
      sortable: false,
      render: (row) => (
        <span className="font-medium">{row.user}</span>
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
          {row.action}
        </button>
      )
    }
  ];

  return (
    <div>
      <DataTableBO
        columns={columns}
        data={paginatedData}
        loading={false}
        searchPlaceholder="Cari berdasarkan aktivitas, user, atau waktu..."
        onSearch={handleSearch}
        showSearch={false}
        onFilter={null}
        onSort={null}
        currentPage={currentPage}
        totalPages={Math.ceil(filteredData.length / perPage)}
        totalItems={filteredData.length}
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