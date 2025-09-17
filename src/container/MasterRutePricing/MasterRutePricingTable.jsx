"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/Button/Button";
import DataTableBO from "@/components/DataTableBO/DataTableBO";
import Toggle from "@/components/Toggle/Toggle";

import { useTranslation } from "@/hooks/use-translation";

import { IconComponent } from "@/components";

const MasterRutePricingTable = ({
  data = [],
  loading = false,
  updatingRoutes = new Set(), // Set of route IDs currently being updated
  onSearch,
  onFilter,
  onSort,
  onPageChange,
  onPerPageChange,
  onStatusChange, // Callback for status changes
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  perPage = 10,
}) => {
  const { t = (key, _, fallback) => fallback || key } = useTranslation() || {};
  const [columns, setColumns] = useState([]);

  const router = useRouter();

  useEffect(() => {
    // Define columns for the route pricing table
    const tableColumns = [
      {
        key: "actions",
        header: t("MasterRutePricing.column.actions", {}, "Aksi"),
        width: "83px",
        headerClassName: "!justify-center",
        sortable: false,
        render: (row) => (
          <div className="flex flex-col gap-[6px]">
            <Button
              variant="muatparts-primary-secondary"
              onClick={() => router.push(`/master-pricing/master-rute-pricing/${row.id}/edit`)}
              className="!h-[20px] !w-[83px] font-semibold"
            >
              Ubah
            </Button>
            <Button
              variant="muatparts-primary"
              onClick={() => router.push(`/master-pricing/master-rute-pricing/${row.id}/detail`)}
              className="!h-[20px] !w-[83px] font-semibold"
            >
              Detail
            </Button>
          </div>
        ),
      },
      {
        key: "status",
        header: t("MasterRutePricing.column.status", {}, "Status"),
        width: "86px",
        headerClassName: "!justify-center",
        sortable: false,
        className: "p-0",
        render: (row) => (
          <div className="flex items-center justify-center">
            <Toggle
              value={row.isActive}
              onClick={(newValue) => {
                if (onStatusChange) {
                  onStatusChange(row.id, newValue);
                }
              }}
              type="primary"
              disabled={updatingRoutes.has(row.id)}
            />
          </div>
        ),
      },
      {
        key: "alias",
        header: t("MasterRutePricing.column.alias", {}, "Alias"),
        sortable: false,
        width: "200px",
        className: "p-0",
        render: (row) => (
          <div className="font-medium text-gray-900">{row.alias}</div>
        ),
      },
      {
        key: "originProvince",
        header: t("MasterRutePricing.column.originProvince", {}, "Provinsi Asal"),
        sortable: false,
        width: "350px",
        className: "p-0",
        render: (row) => (
          <div className="text-sm text-gray-700">{row.originProvince}</div>
        ),
      },
      {
        key: "destinationProvince",
        header: t("MasterRutePricing.column.destinationProvince", {}, "Provinsi Tujuan"),
        sortable: false,
        width: "300px",
        className: "p-0",
        render: (row) => (
          <div className="text-sm text-gray-700">{row.destinationProvince}</div>
        ),
      },
    ];

    setColumns(tableColumns);
  }, [t, router, onStatusChange, updatingRoutes]);

  return (
    <DataTableBO
      columns={columns}
      data={data}
      className="my-4"
      loading={loading}
      searchPlaceholder={t(
        "MasterRutePricing.searchPlaceholder",
        {},
        "Cari Rute"
      )}
      onSearch={onSearch}
      onFilter={onFilter}
      onSort={onSort}
      currentPage={currentPage}
      totalPages={totalPages}
      totalItems={totalItems}
      perPage={perPage}
      onPageChange={onPageChange}
      onPerPageChange={onPerPageChange}
      showFilter={true}
      showSearch={true}
      showPagination={true}
      showTotalCount={true}
      totalCountLabel={t("MasterRutePricing.totalCountLabel", {}, "data")}
      emptyState={
        <div className="flex h-[66px] items-center justify-center">
          <IconComponent
            src="/icons/search-not-found.svg"
            width={24}
            height={24}
            className="mr-2 !text-[#868686]"
          />
          <p className="text-xs font-semibold text-[#868686]">
            {t("MasterRutePricing.noData", {}, "Belum ada data")}
          </p>
        </div>
      }
    />
  );
};

export default MasterRutePricingTable;