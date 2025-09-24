"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/Button/Button";
import DataTableBO from "@/components/DataTableBO/DataTableBO";

import { useTranslation } from "@/hooks/use-translation";

import { IconComponent } from "@/components";

const SettingNilaiVariabelTable = ({
  variablePricingData = [],
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
  const [tableData, setTableData] = useState([]);

  const router = useRouter();

  // Transform variable pricing data to table format
  useEffect(() => {
    if (variablePricingData && variablePricingData.length > 0) {
      const transformedData = variablePricingData.map((item) => ({
        id: item.truckTypeId,
        truckType: item.truckTypeName,
        formula: item.formula || "-",
        validFrom: item.validFrom || "-",
      }));
      setTableData(transformedData);
    } else {
      setTableData([]);
    }
  }, [variablePricingData]);

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

  const handleSearch = (searchQuery) => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <DataTableBO
      columns={columns}
      data={tableData}
      className="mt-5"
      loading={loading}
      searchPlaceholder={t(
        "SettingNilaiVariabel.searchPlaceholder",
        {},
        "Cari Jenis Truk"
      )}
      onSearch={handleSearch}
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
      totalCountLabel={t("SettingNilaiVariabel.totalCountLabel", {}, "data")}
      emptyState={
        <div className="flex h-[66px] items-center justify-center">
          <IconComponent
            src="/icons/search-not-found.svg"
            width={24}
            height={24}
            className="mr-2 !text-[#868686]"
          />
          <p className="text-xs font-semibold text-[#868686]">
            {t("SettingNilaiVariabel.noData", {}, "Data Tidak Ditemukan")}
          </p>
        </div>
      }
    />
  );
};

export default SettingNilaiVariabelTable;
