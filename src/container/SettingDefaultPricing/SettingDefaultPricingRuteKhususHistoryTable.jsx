"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/components/Button/Button";
import DataTableBO from "@/components/DataTableBO/DataTableBO";

export default function SettingDefaultPricingRuteKhususHistoryTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Mock data for history
  const historyData = [
    {
      id: 1,
      updateTime: "08/07/2023 11:50 WIB",
      activity: "Update",
      user: "John Doe",
    },
    {
      id: 2,
      updateTime: "07/07/2023 14:30 WIB",
      activity: "Create",
      user: "Jane Smith",
    },
    {
      id: 3,
      updateTime: "06/07/2023 09:15 WIB",
      activity: "Update",
      user: "Robert Johnson",
    },
  ];

  // Filter data based on search query
  const filteredData = historyData.filter(
    (item) =>
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

  const handleViewDetail = (id) => {
    router.push(
      `/master-pricing/setting-default-pricing/rute-khusus/history/${id}`
    );
  };

  const columns = [
    {
      key: "updateTime",
      header: "Waktu Update",
      sortable: false,
      render: (row) => <div className="text-xs">{row.updateTime}</div>,
    },
    {
      key: "activity",
      header: "Aktivitas",
      sortable: false,
      render: (row) => <div className="text-xs">{row.activity}</div>,
    },
    {
      key: "user",
      header: "User",
      sortable: false,
      render: (row) => <div className="text-xs">{row.user}</div>,
    },
    {
      key: "aksi",
      header: "Aksi",
      sortable: false,
      render: (row) => (
        <Button
          variant="muatparts-primary-outline"
          size="sm"
          onClick={() => handleViewDetail(row.id)}
        >
          <span className="text-xs font-semibold">Lihat Detail</span>
        </Button>
      ),
    },
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
        searchPlaceholder="Cari berdasarkan user atau aktivitas..."
        showSearch={true}
        showPagination={true}
        loading={false}
      />
    </div>
  );
}
