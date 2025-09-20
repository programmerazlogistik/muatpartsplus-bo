"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/Button/Button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/Collapsible/Collapsible";
import DataTableBO from "@/components/DataTableBO/DataTableBO";

import { useTranslation } from "@/hooks/use-translation";

import { IconComponent } from "@/components";

const SettingNilaiVariabelTable = ({
  data = [],
  loading = false,
  updatingVariables = new Set(), // Set of variable IDs currently being updated
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
    // Define columns for the nilai variabel table
    const tableColumns = [
      {
        key: "actions",
        header: t("SettingNilaiVariabel.column.actions", {}, "Aksi"),
        width: "207px",
        headerClassName: "justify-center",
        className: "flex justify-center",
        sortable: false,
        render: (row) => (
          <div className="flex flex-col gap-[6px]">
            <Button
              variant="muatparts-primary-secondary"
              onClick={() =>
                router.push(
                  `/master-pricing/setting-nilai-variabel/${row.id}/atur`
                )
              }
              className="!h-[20px] !w-[83px] font-semibold"
            >
              Atur
            </Button>
            <Button
              variant="muatparts-primary"
              onClick={() =>
                router.push(
                  `/master-pricing/setting-nilai-variabel/${row.id}/detail`
                )
              }
              className="!h-[20px] !w-[83px] font-semibold"
            >
              Detail
            </Button>
          </div>
        ),
      },
      {
        key: "truckType",
        width: "348px",
        header: t("SettingNilaiVariabel.column.truckType", {}, "Jenis Truck"),
        sortable: true,
        render: (row) => <div>{row.truckType || "-"}</div>,
      },
      {
        key: "formula",
        header: t("SettingNilaiVariabel.column.formula", {}, "Rumus"),
        sortable: false,
        render: (row) => <div>{row.formula || "-"}</div>,
      },
    ];

    setColumns(tableColumns);
  }, [t, router, onStatusChange, updatingVariables]);

  return (
    <Collapsible defaultOpen={true}>
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-t-lg !border-[#176CF7] bg-blue-100 p-4 text-blue-900">
        {({ open }) => (
          <>
            <span className="font-medium">Jawa - Jawa</span>
            <svg
              className={`h-4 w-4 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </>
        )}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <DataTableBO
          columns={columns}
          data={data}
          className="my-4"
          loading={loading}
          searchPlaceholder={t(
            "SettingNilaiVariabel.searchPlaceholder",
            {},
            "Cari Jenis Truk"
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
          showPagination={false}
          showTotalCount={false}
          totalCountLabel={t(
            "SettingNilaiVariabel.totalCountLabel",
            {},
            "data"
          )}
          emptyState={
            <div className="flex h-[66px] items-center justify-center">
              <IconComponent
                src="/icons/search-not-found.svg"
                width={24}
                height={24}
                className="mr-2 !text-[#868686]"
              />
              <p className="text-xs font-semibold text-[#868686]">
                {t("SettingNilaiVariabel.noData", {}, "Belum ada data")}
              </p>
            </div>
          }
        />
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SettingNilaiVariabelTable;
