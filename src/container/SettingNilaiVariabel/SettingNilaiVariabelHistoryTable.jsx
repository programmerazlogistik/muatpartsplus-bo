"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import DataTableBO from "@/components/DataTableBO/DataTableBO";

export default function SettingNilaiVariabelHistoryTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  // Extract the nilai variabel ID from the pathname
  // Expected format: /master-pricing/setting-nilai-variabel/[id]/history
  const pathSegments = pathname.split("/");
  const nilaiVariabelId = pathSegments[4]; // Index 4 should be the [id]

  // Mock data for history
  const historyData = [
    {
      id: 1,
      waktuUpdate: "15 Januari 2024, 10:30",
      aktivitas: "Edit Data",
      user: "Admin Muatrans",
      detail: {
        variableName: "Tarif Dasar",
        oldValue: "12000",
        newValue: "15000",
        unit: "Rupiah",
      },
    },
    {
      id: 2,
      waktuUpdate: "10 Januari 2024, 14:20",
      aktivitas: "Create Data",
      user: "Admin Muatrans",
      detail: {
        variableName: "Tarif Dasar",
        oldValue: "-",
        newValue: "12000",
        unit: "Rupiah",
      },
    },
  ];

  // Filter data based on search query
  const filteredData = historyData.filter(
    (item) =>
      item.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.aktivitas.toLowerCase().includes(searchQuery.toLowerCase())
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
    // Navigate to detail change page
    router.push(
      `/master-pricing/setting-nilai-variabel/${nilaiVariabelId}/history/${id}`
    );
  };

  const columns = [
    {
      key: "waktuUpdate",
      header: "Waktu Update",
      sortable: true,
      render: (row) => <div>{row.waktuUpdate}</div>,
    },
    {
      key: "aktivitas",
      header: "Aktivitas",
      sortable: true,
      render: (row) => <div>{row.aktivitas}</div>,
    },
    {
      key: "user",
      header: "Rumus",
      sortable: true,
      render: (row) => <div>{row.user}</div>,
    },
    {
      key: "aksi",
      header: "Aksi",
      sortable: false,
      render: (row) => (
        <button
          type="button"
          onClick={() => handleViewDetail(row.id)}
          className="text-[#176CF7] underline"
        >
          Lihat Detail Perubahan
        </button>
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
        searchPlaceholder="Cari berdasarkan rumus atau aktivitas..."
        showSearch={false}
        showPagination={true}
        loading={false}
      />
    </div>
  );
}
