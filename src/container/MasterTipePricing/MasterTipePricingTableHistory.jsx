"use client";
import DataTableBO from "@/components/DataTableBO/DataTableBO";

export default function MasterTipePricingTableHistory({
  data = [],
  loading = false,
  pagination = null,
  onSearch,
  onPageChange,
  onActionFilter,
  searchTerm = "",
  actionFilter = ""
}) {
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
      key: "name",
      header: "Nama Tipe",
      sortable: false,
      render: (row) => (
        <div className="text-xs font-semibold">{row.name}</div>
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
        searchPlaceholder="Cari berdasarkan nama tipe, user, atau aktivitas..."
        showSearch={false}
        showPagination={true}
        loading={loading}
      />
    </div>
  );
}