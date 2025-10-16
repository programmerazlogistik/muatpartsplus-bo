"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { cn } from "@muatmuat/lib";
import { Alert } from "@muatmuat/ui/Alert";
import { Button } from "@muatmuat/ui/Button";
import { LoadingStatic } from "@muatmuat/ui/Loading";
import { DataTableBO, useDataTable } from "@muatmuat/ui/Table";

import { useGetVendorsInternational } from "@/services/vendorInternasional/useGetVendorsInternasional";

import { ActionDropdown } from "@/components/Dropdown/ActionDropdown";
import PageTitle from "@/components/PageTitle/PageTitle";

const tabs = ["Transaksi", "Pengajuan", "Riwayat"];

export default function VendorInternationalContainer() {
  const router = useRouter();
  const {
    sorting,
    setSorting,
    pagination,
    setPagination,
    searchTerm,
    onSearchChange,
  } = useDataTable();
  const [activeTab, setActiveTab] = useState("Transaksi");

  const { data, isLoading, error } = useGetVendorsInternational({
    pagination,
    sorting,
    searchTerm,
  });

  // Action handlers
  const handleDetail = (vendor) => {
    // Navigate to vendor detail page
    router.push(`/vendor-international/${vendor.id}/detail`);
  };

  const handleEdit = (vendor) => {
    // Navigate to vendor edit page
    router.push(`/vendor-international/${vendor.id}/edit`);
  };

  const handleDeactivate = (vendor) => {
    // Show confirmation dialog before deactivating
    if (
      window.confirm(
        `Are you sure you want to deactivate ${vendor.companyName}?`
      )
    ) {
      // TODO: Implement API call to deactivate vendor
      alert(
        `Vendor ${vendor.companyName} has been deactivated (API call not implemented)`
      );
    }
  };

  const handleFilter = () => {
    // TODO: Implement filter modal
    alert("Filter functionality not implemented yet");
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    alert("Export functionality not implemented yet");
  };

  const handleCreateLink = () => {
    // TODO: Implement create registration link functionality
    alert("Create registration link functionality not implemented yet");
  };

  const handleAdd = () => {
    router.push("/vendor-international/create");
  };

  const columns = [
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <ActionDropdown.Root>
          {/* Simplified API: No complex nesting or asChild needed */}
          <ActionDropdown.Trigger />

          <ActionDropdown.Content>
            <ActionDropdown.Item onClick={() => handleDetail(row.original)}>
              Detail
            </ActionDropdown.Item>
            <ActionDropdown.Item onClick={() => handleEdit(row.original)}>
              Ubah
            </ActionDropdown.Item>
            <ActionDropdown.Item
              onClick={() => handleDeactivate(row.original)}
              isDestructive
            >
              Nonaktifkan
            </ActionDropdown.Item>
          </ActionDropdown.Content>
        </ActionDropdown.Root>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "companyName",
      header: "Nama Perusahaan",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "country",
      header: "Negara",
    },
    {
      accessorKey: "companyType",
      header: "Tipe Perusahaan",
    },
    {
      accessorKey: "totalProducts",
      header: "Jumlah Produk",
    },
    {
      accessorKey: "registrationDate",
      header: "Tanggal Register",
    },
  ];

  if (isLoading) return <LoadingStatic />;
  if (error) return <Alert variant="error">Failed to load companies.</Alert>;

  return (
    <div className="bg-neutral-50 p-6">
      <PageTitle className="mb-2.5">Vendor International</PageTitle>

      <div className="mb-4 flex justify-center">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "h-[30px] basis-0 border px-8 py-2 text-center text-xs font-semibold",
              activeTab === tab
                ? "z-10 border-[#176CF7] bg-[#176CF7] text-white"
                : "border-[#868686] bg-white text-[#868686]",
              index === 0 ? "rounded-l-md" : "",
              index === tabs.length - 1 ? "rounded-r-md" : "",
              index > 0 ? "-ml-px" : ""
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <DataTableBO.Root
        columns={columns}
        data={data?.vendors}
        pageCount={data?.pagination?.totalPages ?? 0}
        paginationData={data?.pagination}
        pagination={pagination}
        onPaginationChange={setPagination}
        sorting={sorting}
        onSortingChange={setSorting}
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
      >
        <DataTableBO.Header>
          <DataTableBO.Search />
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="h-8 rounded-[20px] border-[#176CF7] text-sm font-semibold text-[#176CF7]"
              onClick={handleFilter}
            >
              Filter
            </Button>
            <Button
              variant="outline"
              className="h-8 rounded-[20px] border-[#176CF7] text-sm font-semibold text-[#176CF7]"
              onClick={handleExport}
            >
              Export
            </Button>
            <Button
              variant="outline"
              className="h-8 rounded-[20px] border-[#176CF7] text-sm font-semibold text-[#176CF7]"
              onClick={handleCreateLink}
            >
              Create Link +
            </Button>
            <Button
              variant="outline"
              className="h-8 rounded-[20px] border-[#176CF7] text-sm font-semibold text-[#176CF7]"
              onClick={handleAdd}
            >
              Tambah +
            </Button>
          </div>
        </DataTableBO.Header>
        <DataTableBO.Content />
        <DataTableBO.Pagination />
      </DataTableBO.Root>
    </div>
  );
}
