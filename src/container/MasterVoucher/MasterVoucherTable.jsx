"use client";

import { useEffect, useState } from "react";

import Button from "@/components/Button/Button";
import DataTableBO from "@/components/DataTableBO/DataTableBO";
import Toggle from "@/components/Toggle/Toggle";

import { useTranslation } from "@/hooks/use-translation";

import { IconComponent } from "@/components";

const MasterVoucherTable = ({
  isExpired = false, // to determine if showing expired vouchers
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
    // Define columns for the voucher table
    const tableColumns = [
      {
        key: "actions",
        header: t("MasterVoucher.column.actions", {}, "Aksi"),
        width: "106px",
        headerClassName: "!justify-center",
        sortable: false,
        render: (row) => (
          <div className="flex flex-col gap-[6px]">
            {!isExpired && (
              <Button
                variant="muatparts-primary-secondary"
                className="!h-[20px] !w-[76px] font-semibold"
              >
                Ubah
              </Button>
            )}
            <Button
              variant="muatparts-primary"
              className="!h-[20px] !w-[76px] font-semibold"
            >
              Detail
            </Button>
            <Button
              variant="muatparts-primary"
              className="!h-[20px] !w-[76px] font-semibold"
            >
              History
            </Button>
          </div>
        ),
      },
      ...(!isExpired
        ? [
            {
              key: "status",
              header: t("MasterVoucher.column.status", {}, "Status"),
              width: "86px",
              headerClassName: "!justify-center",
              sortable: false,
              render: (row) => (
                <div className="flex items-center justify-center">
                  <Toggle
                    value={row.isActive}
                    onClick={(newValue) => {
                      // TODO: handle status change (API call etc.)
                    }}
                    type="primary"
                    disabled={false}
                  />
                </div>
              ),
            },
          ]
        : []),
      {
        key: "createdAt",
        header: t("MasterVoucher.column.createdAt", {}, "Tanggal Pembuatan"),
        sortable: true,
        headerClassName: "text-center",
        width: "125px",
        render: (row) => (
          <div className="text-center">
            <div>{row.createdDate}</div>
            <div>{row.createdTime}</div>
          </div>
        ),
      },
      {
        key: "validPeriod",
        header: t("MasterVoucher.column.validPeriod", {}, "Periode Berlaku"),
        sortable: true,
        width: "107px",
        render: (row) => (
          <div className="my-auto flex h-[72px] flex-col items-center justify-center text-center">
            <div>{row.startDate}</div>
            <div>s.d</div>
            <div>{row.endDate}</div>
          </div>
        ),
      },
      {
        key: "voucherCode",
        header: t("MasterVoucher.column.voucherCode", {}, "Kode Voucher"),
        sortable: true,
        width: "158px",
      },
      {
        key: "discount",
        header: t("MasterVoucher.column.discount", {}, "Potongan"),
        sortable: false,
        headerClassName: "justify-center",
        className: "text-center",
        width: "151px",
        render: (row) => {
          // Format based on whether it's percentage or fixed amount
          return row.discountType === "percentage"
            ? `${row.discountValue}%`
            : `Rp${row.discountValue.toLocaleString("id-ID")}`;
        },
      },
      {
        key: "maxDiscount",
        header: t("MasterVoucher.column.maxDiscount", {}, "Maks. Potongan"),
        sortable: true,
        headerClassName: "text-right",
        className: "text-right",
        width: "127px",
        render: (row) => {
          // Handle case where there's no max discount
          return row.maxDiscount
            ? `Rp${row.maxDiscount.toLocaleString("id-ID")}`
            : "-";
        },
      },
      {
        key: "quota",
        header: t("MasterVoucher.column.quota", {}, "Sisa/Kuota"),
        className: "text-center",
        sortable: true,
        headerClassName: "!justify-center",
        width: "138px",
        render: (row) => `${row.remainingQuota}/${row.totalQuota}`,
      },
      {
        key: "claims",
        header: t("MasterVoucher.column.claims", {}, "Klaim (Jumlah/User)"),
        headerClassName: "text-center",
        className: "text-center",
        sortable: true,
        width: "144px",
        render: (row) => `${row.totalClaims}/${row.uniqueUsers}`,
      },
      {
        key: "totalClaimValue",
        header: t(
          "MasterVoucher.column.totalClaimValue",
          {},
          "Total Nilai Klaim (Rp)"
        ),
        sortable: true,
        width: "137px",
        render: (row) => `Rp${row.totalClaimValue.toLocaleString("id-ID")}`,
      },
    ];

    setColumns(tableColumns);
  }, [t, isExpired]);

  return (
    <DataTableBO
      columns={columns}
      data={data}
      loading={loading}
      searchPlaceholder={t(
        "MasterVoucher.searchPlaceholder",
        {},
        "Cari Kode Voucher"
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
      totalCountLabel={t("MasterVoucher.totalCountLabel", {}, "data")}
      emptyState={
        <div className="flex h-[66px] items-center justify-center">
          <IconComponent
            src="/icons/search-not-found.svg"
            width={24}
            height={24}
            className="mr-2 !text-[#868686]"
          />
          <p className="text-xs font-semibold text-[#868686]">
            {t("MasterVoucher.noData", {}, "Belum ada data")}
          </p>
        </div>
      }
    />
  );
};

export default MasterVoucherTable;
