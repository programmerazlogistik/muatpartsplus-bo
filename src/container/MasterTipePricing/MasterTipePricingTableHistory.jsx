"use client";
import { useState } from "react";
import DataTableBO from "@/components/DataTableBO/DataTableBO";

export default function MasterTipePricingTableHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for history
  const historyData = [
    {
      id: 1,
      updateTime: "08/07/2023 11:50 WIB",
      activity: "Update",
      user: "John",
      typeName: "Medium",
      status: "Aktif"
    },
    {
      id: 2,
      updateTime: "07/07/2023 14:30 WIB",
      activity: "Create",
      user: "Jane",
      typeName: "Large",
      status: "Aktif"
    }
  ];

  // Filter data based on search query
  const filteredData = historyData.filter(item =>
    item.typeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.activity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalData = filteredData.length;
  const totalPages = Math.ceil(totalData / perPage);
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

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const columns = [
    {
      key: "updateTime",
      header: "Waktu Update",
      sortable: false,
      render: (row) => (
        <div className="text-sm text-gray-900">
          {row.updateTime}
        </div>
      )
    },
    {
      key: "activity",
      header: "Aktivitas",
      sortable: false,
      render: (row) => (
        <div className="text-sm text-gray-900">
          {row.activity}
        </div>
      )
    },
    {
      key: "user",
      header: "User",
      sortable: false,
      render: (row) => (
        <div className="text-sm text-gray-900">
          {row.user}
        </div>
      )
    },
    {
      key: "typeName",
      header: "Nama Tipe",
      sortable: false,
      render: (row) => (
        <div className="text-sm text-gray-900">
          {row.typeName}
        </div>
      )
    },
    {
      key: "status",
      header: "Status",
      sortable: false,
      render: (row) => (
        <span>
          {row.status}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-4">
      <DataTableBO
        data={paginatedData}
        columns={columns}
        currentPage={currentPage}
        perPage={perPage}
        totalData={totalData}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
        onSearch={handleSearch}
        searchPlaceholder="Cari berdasarkan nama tipe, user, atau aktivitas..."
        showSearch={false}
        showPagination={true}
        loading={false}
      />
    </div>
  );
}