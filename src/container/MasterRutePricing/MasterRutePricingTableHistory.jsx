"use client";
import { useState } from "react";
import DataTableBO from "@/components/DataTableBO/DataTableBO";
import Button from "@/components/Button/Button";

export default function MasterRutePricingTableHistory({
  data = [],
  loading = false,
  pagination = null,
  onSearch,
  onPageChange,
  onActionFilter,
  searchTerm = "",
  actionFilter = ""
}) {
  const [showSpecialRouteModal, setShowSpecialRouteModal] = useState(false);
  const [selectedSpecialRoutes, setSelectedSpecialRoutes] = useState([]);

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
      key: "createdAt",
      header: "Waktu Update",
      sortable: false,
      render: (row) => (
        <div className="text-xs font-semibold">
          {row.createdAt ? new Date(row.createdAt).toLocaleString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }) : ""}
        </div>
      ),
    },
    {
      key: "action",
      header: "Aktivitas",
      sortable: false,
      render: (row) => (
        <div className="text-xs font-semibold">
          {row.action === "CREATE" ? "Create" : 
           row.action === "UPDATE" ? "Update" : 
           row.action === "DELETE" ? "Delete" : 
           row.action}
        </div>
      ),
    },
    {
      key: "createdBy",
      header: "User",
      sortable: false,
      render: (row) => <div className="text-xs font-semibold">{row.createdBy}</div>,
    },
    {
      key: "alias",
      header: "Alias",
      sortable: false,
      render: (row) => (
        <div className="text-xs font-semibold">{row.alias}</div>
      ),
    },
    {
      key: "originProvinces",
      header: "Asal",
      sortable: false,
      render: (row) => (
        <div className="text-xs font-semibold max-w-xs">
          {row.originProvinces ? row.originProvinces.map(p => p.name).join(", ") : ""}
        </div>
      ),
    },
    {
      key: "destinationProvinces",
      header: "Tujuan",
      sortable: false,
      render: (row) => (
        <div className="text-xs font-semibold max-w-xs">
          {row.destinationProvinces ? row.destinationProvinces.map(p => p.name).join(", ") : ""}
        </div>
      ),
    },
    {
      key: "specialRoutes",
      header: "Rute Khusus",
      sortable: false,
      render: (row) => (
        <div className="text-xs">
          {!row.specialRoutes || row.specialRoutes.length === 0 ? (
            <span className="text-gray-400">=</span>
          ) : (
            <button
              className="text-blue-600 underline hover:text-blue-800 cursor-pointer font-semibold"
              onClick={() => handleViewSpecialRoutes(row.specialRoutes)}
            >
              Lihat Detail Rute Khusus
            </button>
          )}
        </div>
      ),
    },
    {
      key: "isActive",
      header: "Status",
      sortable: false,
      render: (row) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold`}>
          {row.isActive ? "Aktif" : "Tidak Aktif"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <DataTableBO
        data={data}
        columns={columns}
        currentPage={pagination?.currentPage || 1}
        perPage={pagination?.recordsPerPage || 10}
        totalItems={pagination?.totalRecords || 0}
        totalPages={pagination?.totalPages || 1}
        onPageChange={onPageChange}
        onSearch={onSearch}
        searchPlaceholder="Cari berdasarkan alias, user, atau aktivitas..."
        showSearch={false}
        showPagination={true}
        loading={loading}
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
                    {route.originCityName} - {route.destinationCityName}
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