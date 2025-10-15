"use client";

import { useState } from "react";

import { cn } from "@muatmuat/lib";
import { Alert } from "@muatmuat/ui/Alert";
import { Button } from "@muatmuat/ui/Button";
import { LoadingStatic } from "@muatmuat/ui/Loading";
import { DataTableBO, useDataTable } from "@muatmuat/ui/Table";

import { useGetVendorsInternational } from "@/services/vendorInternasional/useGetVendorsInternasional";

import PageTitle from "@/components/PageTitle/PageTitle";

const columns = [
  {
    id: "actions",
    header: "Action",
    cell: () => <div className="">anjay</div>,
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
const tabs = ["Transaksi", "Pengajuan", "Riwayat"];

export default function VendorInternationalContainer() {
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

  if (isLoading) return <LoadingStatic />;
  if (error) return <Alert variant="error">Failed to load companies.</Alert>;

  return (
    <div className="space-y-[10px] bg-neutral-50 p-6">
      <PageTitle>Vendor International</PageTitle>

      <div className="flex justify-center">
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
            >
              Filter
            </Button>
            <Button
              variant="outline"
              className="h-8 rounded-[20px] border-[#176CF7] text-sm font-semibold text-[#176CF7]"
            >
              Export
            </Button>
            <Button
              variant="outline"
              className="h-8 rounded-[20px] border-[#176CF7] text-sm font-semibold text-[#176CF7]"
            >
              Create Link +
            </Button>
            <Button
              variant="outline"
              className="h-8 rounded-[20px] border-[#176CF7] text-sm font-semibold text-[#176CF7]"
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
