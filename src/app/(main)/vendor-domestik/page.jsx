"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useGetSellerTransactions } from "@/services/vendor-domestik/useGetSellerTransactions";

import BadgeStatus from "@/components/Badge/BadgeStatus";
import Button from "@/components/Button/Button";
import Input from "@/components/Form/Input";
import IconComponent from "@/components/IconComponent/IconComponent";

import { cn } from "@/lib/utils";

import { DataTableBO } from "@/components";

const SellerDomestikPage = () => {
  const [activeTab, setActiveTab] = useState("Transaksi");
  const tabs = ["Transaksi", "Pengajuan", "Riwayat"];
  const router = useRouter();

  // State for DataTableBO
  const [columns, setColumns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ sort: null, order: null });

  // SWR hook for data fetching
  const {
    data: sellerData,
    isLoading,
    error,
  } = useGetSellerTransactions({
    page: currentPage,
    limit: perPage,
    search: searchTerm,
    sort: sortConfig.sort,
    order: sortConfig.order,
  });

  useEffect(() => {
    const getStatusVariant = (status) => {
      switch (status) {
        case "SELESAI":
          return "success";
        case "DIKIRIM":
          return "primary";
        case "DIPROSES":
          return "warning";
        case "DIBATALKAN":
          return "error";
        default:
          return "neutral";
      }
    };

    const tableColumns = [
      {
        key: "actions",
        header: "Aksi",
        width: "120px",
        headerClassName: "!justify-center",
        sortable: false,
        render: (row) => (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="muatparts-primary-secondary"
              onClick={() => router.push(`/seller-domestik/${row.id}/edit`)}
              className="!h-6 !text-xs"
            >
              Ubah
            </Button>
            <Button
              variant="muatparts-primary"
              onClick={() => router.push(`/seller-domestik/${row.id}/detail`)}
              className="!h-6 !text-xs"
            >
              Detail
            </Button>
          </div>
        ),
      },
      {
        key: "status",
        header: "Status",
        sortable: true,
        width: "150px",
        render: (row) => (
          <BadgeStatus variant={getStatusVariant(row.status)}>
            {row.status}
          </BadgeStatus>
        ),
      },
      {
        key: "transactionCode",
        header: "Nomor Transaksi",
        sortable: true,
        width: "200px",
        render: (row) => (
          <div className="font-medium text-gray-900">{row.transactionCode}</div>
        ),
      },
      {
        key: "productName",
        header: "Nama Produk",
        sortable: true,
        width: "250px",
      },
      {
        key: "buyerName",
        header: "Pembeli",
        sortable: true,
        width: "200px",
      },
      {
        key: "date",
        header: "Tanggal Transaksi",
        sortable: true,
        width: "180px",
        render: (row) =>
          new Date(row.date).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
      },
      {
        key: "totalPrice",
        header: "Total Harga",
        sortable: true,
        width: "150px",
        render: (row) =>
          `Rp${new Intl.NumberFormat("id-ID").format(row.totalPrice)}`,
      },
    ];

    setColumns(tableColumns);
  }, [router]);

  // Handlers for DataTableBO props
  const handlePageChange = (page) => setCurrentPage(page);
  const handlePerPageChange = (newPerPage) => setPerPage(newPerPage);
  const handleSearch = (query) => setSearchTerm(query);
  const handleSort = (sort, order) => setSortConfig({ sort, order });

  return (
    <div className="space-y-6 bg-white p-6">
      <div className="flex items-center gap-2">
        <button aria-label="Go back">
          <IconComponent
            src="/icons/arrow-left24.svg"
            className="size-6 text-[#1B1B1B]"
          />
        </button>
        <h1 className="text-xl font-medium text-[#1B1B1B]">Seller Domestik</h1>
      </div>

      <div className="space-y-4">
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

        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-grow items-center gap-3">
            <label htmlFor="search" className="shrink-0 text-sm text-[#1B1B1B]">
              Pencarian:
            </label>
            <Input
              id="search"
              placeholder="Cari"
              className="w-[232px]"
              appearance={{ containerClassName: "h-8" }}
            />
          </div>

          <div className="flex shrink-0 items-center gap-4">
            <button
              aria-label="Notifications"
              className="flex h-8 w-8 items-center justify-center rounded-md border border-[#EBEBEB] bg-white p-2 shadow-[1px_2px_4px_rgba(0,0,0,0.11)]"
            >
              <IconComponent src="/icons/bell.svg" className="size-4" />
            </button>
            <Button
              variant="muatparts-primary-secondary"
              className="h-8 rounded-full"
            >
              Filter
            </Button>
            <Button
              variant="muatparts-primary-secondary"
              className="h-8 rounded-full"
            >
              Export
            </Button>
            <Button
              variant="muatparts-primary-secondary"
              className="h-8 rounded-full"
            >
              Create Link +
            </Button>
            <Button
              variant="muatparts-primary-secondary"
              className="h-8 rounded-full"
            >
              Tambah +
            </Button>
          </div>
        </div>
      </div>

      {/* Dynamic Content: DataTable for "Transaksi" tab */}
      <div className="mt-4">
        {activeTab === "Transaksi" && (
          <DataTableBO
            columns={columns}
            data={sellerData?.transactions || []}
            loading={isLoading}
            searchPlaceholder="Cari Nomor Transaksi atau Nama Produk"
            onSearch={handleSearch}
            onSort={handleSort}
            currentPage={sellerData?.pagination.currentPage || 1}
            totalPages={sellerData?.pagination.totalPages || 1}
            totalItems={sellerData?.pagination.totalItems || 0}
            perPage={sellerData?.pagination.perPage || 10}
            onPageChange={handlePageChange}
            onPerPageChange={handlePerPageChange}
            showFilter={false} // Hiding filter bar for this implementation
            totalCountLabel="transaksi"
            emptyState={
              <div className="flex h-48 items-center justify-center">
                <IconComponent
                  src="/icons/search-not-found.svg"
                  width={32}
                  height={32}
                  className="mr-3 !text-[#868686]"
                />
                <p className="font-semibold text-[#868686]">
                  Data Transaksi Tidak Ditemukan
                </p>
              </div>
            }
          />
        )}
        {activeTab === "Pengajuan" && (
          <div className="p-10 text-center">Content for Pengajuan</div>
        )}
        {activeTab === "Riwayat" && (
          <div className="p-10 text-center">Content for Riwayat</div>
        )}
      </div>
    </div>
  );
};

export default SellerDomestikPage;
