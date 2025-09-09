"use client";

import { useEffect, useState } from "react";

import DataTableBO from "@/components/DataTableBO/DataTableBO";

import { useTranslation } from "@/hooks/use-translation";

import { IconComponent } from "@/components";

const MasterVoucherUsageHistoryTable = ({
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

  useEffect(() => {
    const tableColumns = [
      {
        key: "userId",
        header: t("MasterVoucher.usageHistory.column.userId", {}, "ID User"),
        width: "133px",
        headerClassName: "text-start",
        className: "text-start pl-5",
        sortable: false,
      },
      {
        key: "companyName",
        header: t(
          "MasterVoucher.usageHistory.column.companyName",
          {},
          "Nama Pemegang Akun / Nama Perusahaan"
        ),
        width: "133px",
        headerClassName: "text-start",
        sortable: false,
      },
      {
        key: "phoneNumber",
        header: t(
          "MasterVoucher.usageHistory.column.phoneNumber",
          {},
          "No.HP / WA"
        ),
        width: "133px",
        headerClassName: "text-center justify-center",
        className: "text-center",
        sortable: false,
      },
      {
        key: "emailUser",
        header: t(
          "MasterVoucher.usageHistory.column.emailUser",
          {},
          "Email User"
        ),
        width: "133px",
        headerClassName: "text-center justify-center",
        sortable: false,
        render: (row) => (
          <div className="px-2 text-start text-xs">
            {row.emailUser === "-" ? (
              <p className="block text-center text-gray-500">-</p>
            ) : (
              <p className="whitespace-normal break-words">{row.emailUser}</p>
            )}
          </div>
        ),
      },
      {
        key: "paymentDate",
        header: t(
          "MasterVoucher.usageHistory.column.paymentDate",
          {},
          "Tanggal Bayar"
        ),
        width: "133px",
        headerClassName: "text-center justify-center",
        className: "text-center",
        sortable: false,
      },
      {
        key: "invoiceNumber",
        header: t(
          "MasterVoucher.usageHistory.column.invoiceNumber",
          {},
          "No. Invoice"
        ),
        width: "123px",
        headerClassName: "text-center justify-center",
        className: "text-center whitespace-pre-line break-words",
        sortable: false,
        render: (row) => (
          <div className="max-w-[107px]">{row.invoiceNumber}</div>
        ),
      },
      {
        key: "claimValue",
        header: t(
          "MasterVoucher.usageHistory.column.claimValue",
          {},
          "Nilai Klaim (Rp)"
        ),
        width: "133px",
        headerClassName: "text-end justify-end",
        className: "text-end pr-5",
        sortable: false,
      },
    ];

    setColumns(tableColumns);
  }, [t]);

  return (
    <DataTableBO
      columns={columns}
      data={data}
      loading={loading}
      searchPlaceholder={t(
        "MasterVoucher.usageHistory.searchPlaceholder",
        {},
        "Cari data history pemakaian"
      )}
      onSearch={onSearch}
      showSearch={false}
      onFilter={onFilter}
      onSort={onSort}
      currentPage={currentPage}
      totalPages={totalPages}
      totalItems={totalItems}
      perPage={perPage}
      onPageChange={onPageChange}
      onPerPageChange={onPerPageChange}
      showFilter={true}
      showPagination={true}
      showTotalCount={true}
      totalCountLabel={t(
        "MasterVoucher.usageHistory.totalCountLabel",
        {},
        "data"
      )}
      className={"my-[10px]"}
      emptyState={
        <div className="flex h-[66px] items-center justify-center">
          <IconComponent
            src="/icons/search-not-found.svg"
            width={24}
            height={24}
            className="mr-2 !text-[#868686]"
          />
          <p className="text-xs font-semibold text-[#868686]">
            {t(
              "MasterVoucher.usageHistory.noData",
              {},
              "Belum ada data history pemakaian"
            )}
          </p>
        </div>
      }
    />
  );
};

export default MasterVoucherUsageHistoryTable;
