"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/Button/Button";
import DataTableBO from "@/components/DataTableBO/DataTableBO";

import { useTranslation } from "@/hooks/use-translation";

import { IconComponent } from "@/components";

const SettingDefaultPricingTable = ({
  data = [],
  loading = false,
  onSearch,
  onFilter,
  onSort,
  onPageChange,
  onPerPageChange,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  perPage = 10,
}) => {
  const { t = (key, _, fallback) => fallback || key } = useTranslation() || {};
  const [columns, setColumns] = useState([]);

  const router = useRouter();

  useEffect(() => {
    // Define columns for the setting default pricing table
    const tableColumns = [
      {
        key: "actions",
        header: t("SettingDefaultPricing.column.actions", {}, "Aksi"),
        width: "83px",
        headerClassName: "justify-center",
        sortable: true,
        render: (row) => (
          <div className="flex flex-col items-center gap-[6px]">
            <Button
              variant="muatparts-primary-secondary"
              onClick={() =>
                router.push(
                  `/master-pricing/setting-default-pricing/rute-khusus/${row.id}/atur`
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
                  `/master-pricing/setting-default-pricing/rute-khusus/${row.id}/detail`
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
        key: "specialRoute",
        header: t(
          "SettingDefaultPricing.column.specialRoute",
          {},
          "Rute Khusus"
        ),
        sortable: true,
        width: "347px",
        render: (row) => (
          <div className="text-xs font-semibold text-gray-900">
            {row.specialRoute}
          </div>
        ),
      },
      {
        key: "pricing",
        header: t("SettingDefaultPricing.column.pricing", {}, "Pricing"),
        sortable: false,
        width: "200px",
        render: (row) => (
          <div className="text-xs font-semibold">
            {row.pricing ? `Rp ${row.pricing.toLocaleString("id-ID")}` : "-"}
          </div>
        ),
      },
    ];

    setColumns(tableColumns);
  }, [t, router]);

  return (
    <DataTableBO
      columns={columns}
      data={data}
      className="my-4"
      loading={loading}
      searchPlaceholder={t(
        "SettingDefaultPricing.searchPlaceholder",
        {},
        "Cari Default Pricing"
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
      showSearch={false}
      showPagination={true}
      showTotalCount={true}
      totalCountLabel={t("SettingDefaultPricing.totalCountLabel", {}, "data")}
      emptyState={
        <div className="flex h-[66px] items-center justify-center">
          <IconComponent
            src="/icons/search-not-found.svg"
            width={24}
            height={24}
            className="mr-2 !text-[#868686]"
          />
          <p className="text-xs font-semibold text-[#868686]">
            {t("SettingDefaultPricing.noData", {}, "Belum ada data")}
          </p>
        </div>
      }
    />
  );
};

export default SettingDefaultPricingTable;
