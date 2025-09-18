"use client";
import { useState } from "react";

import DataTableBO from "@/components/DataTableBO/DataTableBO";

export default function SettingTarifMinimalTableHistory() {
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
      header: "Waktu Update",
      accessorKey: "updateTime",
      sortable: false,
      render: (row) => (
        <div>
          <div className="font-medium">{row.updateTime}</div>
          <div className="text-sm text-gray-500">{row.updateTimeDetail}</div>
        </div>
      )
    },
    {
      header: "Aktivitas",
      accessorKey: "activity",
      sortable: false,
      render: (row) => (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
          {row.activity}
        </span>
      )
    },
    {
      header: "User",
      accessorKey: "user",
      sortable: false,
      render: (row) => (
        <span className="font-medium">{row.user}</span>
      )
    },
    {
      header: "Aksi",
      accessorKey: "action",
      sortable: false,
      render: (row) => (
        <button
          onClick={() => (router.push(`/master-pricing/setting-tarif-minimal/${row.id}/detail`))}
          className="text-blue-600 hover:text-blue-800 underline text-sm font-medium"
        >
          {row.action}
        </button>
      )
    }
  ];

  return (
    <div>
      <DataTableBO
        data={paginatedData}
        columns={columns}
        showPagination={true}
        className={"my-[20px]"}
        currentPage={currentPage}
        totalPages={Math.ceil(filteredData.length / perPage)}
        perPage={perPage}
        totalItems={filteredData.length}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
        onSearch={handleSearch}
        searchPlaceholder="Cari berdasarkan aktivitas, user, atau waktu..."
        showSearch={true}
      />
    </div>
  );
}