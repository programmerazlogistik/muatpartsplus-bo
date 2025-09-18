"use client";
import { useState } from "react";
import DataTableBO from "@/components/DataTableBO/DataTableBO";
import Button from "@/components/Button/Button";

export default function MasterRutePricingTableHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSpecialRouteModal, setShowSpecialRouteModal] = useState(false);
  const [selectedSpecialRoutes, setSelectedSpecialRoutes] = useState([]);

  // Mock data for history
  const historyData = [
    {
      id: 1,
      updateTime: "08/07/2023 11:50 WIB",
      activity: "Update",
      user: "John",
      alias: "Jawa - Jawa",
      origin: "Daerah Istimewa Yogyakarta, DKI Jakarta, Jawa Barat, Jawa Tengah, Jawa Timur",
      destination: "Daerah Istimewa Yogyakarta, DKI Jakarta, Jawa Barat, Jawa Tengah, Jawa Timur",
      specialRoute: "Lihat Detail Rute Khusus",
      specialRoutes: [
        "Kota Surabaya - Kota Malang",
        "Kota Surabaya - Kab. Malang", 
        "Kota Surabaya - Kota Yogyakarta",
        "Kota Surabaya - Kota Jakarta Barat",
        "Kota Surabaya - Kota Jakarta Pusat"
      ],
      status: "Aktif"
    },
    {
      id: 2,
      updateTime: "07/07/2023 14:30 WIB",
      activity: "Create",
      user: "Jane",
      alias: "Sumatera - Jawa",
      origin: "Sumatera Utara, Sumatera Selatan, Lampung",
      destination: "DKI Jakarta, Jawa Barat, Jawa Tengah",
      specialRoute: "=",
      specialRoutes: [],
      status: "Aktif"
    }
  ];

  // Filter data based on search query
  const filteredData = historyData.filter(item =>
    item.alias.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  const handleViewSpecialRoutes = (specialRoutes) => {
    setSelectedSpecialRoutes(specialRoutes);
    setShowSpecialRouteModal(true);
  };

  const handleCloseModal = () => {
    setShowSpecialRouteModal(false);
    setSelectedSpecialRoutes([]);
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
      key: "alias",
      header: "Alias",
      sortable: false,
      render: (row) => (
        <div className="text-sm text-gray-900">
          {row.alias}
        </div>
      )
    },
    {
      key: "origin",
      header: "Asal",
      sortable: false,
      render: (row) => (
        <div className="text-sm text-gray-900 max-w-xs">
          {row.origin}
        </div>
      )
    },
    {
      key: "destination",
      header: "Tujuan",
      sortable: false,
      render: (row) => (
        <div className="text-sm text-gray-900 max-w-xs">
          {row.destination}
        </div>
      )
    },
    {
      key: "specialRoute",
      header: "Rute Khusus",
      sortable: false,
      render: (row) => (
        <div className="text-sm">
          {row.specialRoute === "=" ? (
            <span className="text-gray-400">=</span>
          ) : (
            <button
              className="text-blue-600 underline hover:text-blue-800 cursor-pointer"
              onClick={() => handleViewSpecialRoutes(row.specialRoutes)}
            >
              {row.specialRoute}
            </button>
          )}
        </div>
      )
    },
    {
      key: "status",
      header: "Status",
      sortable: false,
      render: (row) => (
        <span
        >
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
        searchPlaceholder="Cari berdasarkan alias, user, atau aktivitas..."
        showSearch={false}
        showPagination={true}
        loading={false}
      />

      {/* Special Route Modal */}
      {showSpecialRouteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Rute Khusus</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ×
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-4">
              <ol className="list-decimal list-inside space-y-2">
                {selectedSpecialRoutes.map((route, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    {route}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}