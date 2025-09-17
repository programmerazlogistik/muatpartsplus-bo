"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/Button/Button";
import DataTableBO from "@/components/DataTableBO/DataTableBO";
import Toggle from "@/components/Toggle/Toggle";

import { useTranslation } from "@/hooks/use-translation";

import { IconComponent } from "@/components";

const MasterTipePricingTable = ({
  data = [],
  loading = false,
  updatingTypes = new Set(), // Set of type IDs currently being updated
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
    // Define columns for the tipe pricing table
    const tableColumns = [
      {
        key: "actions",
        header: t("MasterTipePricing.column.actions", {}, "Aksi"),
        width: "36px",
        headerClassName: "!justify-center",
        sortable: false,
        render: (row) => (
          <div className="flex flex-col gap-[6px]">
            <Button
              variant="muatparts-primary-secondary"
              onClick={() => router.push(`/master-pricing/master-tipe-pricing/${row.id}/edit`)}
              className="!h-[20px] !w-[83px] font-semibold"
            >
              Ubah
            </Button>
            <Button
              variant="muatparts-primary"
              onClick={() => router.push(`/master-pricing/master-tipe-pricing/${row.id}/detail`)}
              className="!h-[20px] !w-[83px] font-semibold"
            >
              Detail
            </Button>
          </div>
        ),
      },
      {
        key: "status",
        header: t("MasterTipePricing.column.status", {}, "Status"),
        width: "36px",
        headerClassName: "!justify-center",
        sortable: false,
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
              disabled={updatingTypes.has(row.id)}
            />
          </div>
        ),
      },
      {
        key: "typeName",
        header: t("MasterTipePricing.column.typeName", {}, "Nama Tipe"),
        sortable: false,
        width: "200px",
        className: "p-0",
        render: (row) => (
          <div className="font-medium text-gray-900">{row.typeName}</div>
        ),
      },
    ];

    setColumns(tableColumns);
  }, [t, router, onStatusChange, updatingTypes]);

  return (
    <DataTableBO
      columns={columns}
      data={data}
      className="my-4"
      loading={loading}
      searchPlaceholder={t(
        "MasterTipePricing.searchPlaceholder",
        {},
        "Cari Tipe"
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
      totalCountLabel={t("MasterTipePricing.totalCountLabel", {}, "data")}
      emptyState={
        <div className="flex h-[66px] items-center justify-center">
          <IconComponent
            src="/icons/search-not-found.svg"
            width={24}
            height={24}
            className="mr-2 !text-[#868686]"
          />
          <p className="text-xs font-semibold text-[#868686]">
            {t("MasterTipePricing.noData", {}, "Belum ada data")}
          </p>
        </div>
      }
    />
  );
};

export default MasterTipePricingTable;