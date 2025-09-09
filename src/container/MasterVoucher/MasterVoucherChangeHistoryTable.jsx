"use client";

import { useEffect, useState } from "react";

import DataTableBO from "@/components/DataTableBO/DataTableBO";
import SelectedItemsModal from "@/components/SelectedItemsModal/SelectedItemsModal";

import { useTranslation } from "@/hooks/use-translation";

import { IconComponent } from "@/components";

const ListItemsRenderer = ({ items, maxVisible = 3 }) => {
  const [showModal, setShowModal] = useState(false);

  if (!Array.isArray(items) || items.length === 0) {
    return <span className="text-gray-500">-</span>;
  }

  const visibleItems = items.slice(0, maxVisible);
  const remainingCount = items.length - maxVisible;

  return (
    <div className="px-3 text-xs">
      <ul className="list-disc">
        {visibleItems.map((item, index) => (
          <li key={item.value || index}>{item.label}</li>
        ))}

        {remainingCount > 0 && (
          <li>
            <button
              onClick={() => setShowModal(true)}
              className="text-primary-700 underline hover:text-primary-800"
            >
              +{remainingCount} lainnya
            </button>
          </li>
        )}
      </ul>

      {remainingCount > 0 && (
        <SelectedItemsModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          items={items.slice(maxVisible)}
          title="Item Lainnya"
        />
      )}
    </div>
  );
};

const MasterVoucherChangeHistoryTable = ({
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
        key: "updateTime",
        header: t(
          "MasterVoucher.changeHistory.column.updateTime",
          {},
          "Waktu Update"
        ),
        width: "98px",
        headerClassName: "text-center",
        sortable: false,
        render: (row) => (
          <div className="text-center">
            <div className="text-xs">{row.updateTime}</div>
            <div className="text-xs">{row.updateDate}</div>
          </div>
        ),
      },
      {
        key: "activity",
        header: t(
          "MasterVoucher.changeHistory.column.activity",
          {},
          "Aktivitas"
        ),
        width: "89px",
        headerClassName: "text-center",
        className: "text-center",
        sortable: false,
      },
      {
        key: "user",
        header: t("MasterVoucher.changeHistory.column.user", {}, "User"),
        width: "114px",
        headerClassName: "text-center",
        className: "text-center",
        sortable: false,
      },
      {
        key: "termsConditions",
        header: t(
          "MasterVoucher.changeHistory.column.termsConditions",
          {},
          "Syarat & Ketentuan"
        ),
        width: "164px",
        sortable: false,
        render: (row) => <div>{row.termsConditions}</div>,
      },
      {
        key: "paymentMethods",
        header: t(
          "MasterVoucher.changeHistory.column.paymentMethods",
          {},
          "Cara Pemakaian"
        ),
        width: "164px",
        className: "text-center",
        headerClassName: "text-center",
        sortable: false,
        render: (row) => <div>{row.paymentMethods}</div>,
      },
      {
        key: "validPeriod",
        header: t(
          "MasterVoucher.changeHistory.column.validPeriod",
          {},
          "Periode Berlaku"
        ),
        width: "164px",
        className: "text-center",
        headerClassName: "text-center",
        sortable: false,
        render: (row) => (
          <div className="flex flex-col items-center">
            <span>{row.validPeriod.start}</span>
            <span>s.d</span>
            <span>{row.validPeriod.end}</span>
          </div>
        ),
      },
      {
        key: "userType",
        header: t("MasterVoucher.changeHistory.column.userType", {}, "User"),
        width: "164px",
        sortable: false,
        render: (row) => <ListItemsRenderer items={row.userType} />,
      },
      {
        key: "quota",
        header: t(
          "MasterVoucher.changeHistory.column.quota",
          {},
          "Kuota Voucher"
        ),
        width: "164px",
        headerClassName: "text-center",
        className: "text-center",
        sortable: false,
      },
      {
        key: "quotaPerUser",
        header: t(
          "MasterVoucher.changeHistory.column.quotaPerUser",
          {},
          "Kuota/User"
        ),
        width: "164px",
        headerClassName: "text-center",
        className: "text-center",
        sortable: false,
      },
      {
        key: "paymentInstallment",
        header: t(
          "MasterVoucher.changeHistory.column.paymentInstallment",
          {},
          "Metode Bayar & Instalasi"
        ),
        width: "164px",
        sortable: false,
        render: (row) => <ListItemsRenderer items={row.paymentInstallment} />,
      },
      {
        key: "location",
        header: t(
          "MasterVoucher.changeHistory.column.location",
          {},
          "Lokasi Muat"
        ),
        width: "164px",
        sortable: false,
        render: (row) => <ListItemsRenderer items={row.location} />,
      },
      {
        key: "originLocation",
        header: t(
          "MasterVoucher.changeHistory.column.originLocation",
          {},
          "Lokasi Bongkar"
        ),
        width: "164px",
        sortable: false,
        render: (row) => <ListItemsRenderer items={row.originLocation} />,
      },
      {
        key: "status",
        header: t("MasterVoucher.changeHistory.column.status", {}, "Status"),
        width: "174px",
        headerClassName: "text-center",
        className: "text-start",
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
        "MasterVoucher.changeHistory.searchPlaceholder",
        {},
        "Cari data history"
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
        "MasterVoucher.changeHistory.totalCountLabel",
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
              "MasterVoucher.changeHistory.noData",
              {},
              "Belum ada data history"
            )}
          </p>
        </div>
      }
    />
  );
};

export default MasterVoucherChangeHistoryTable;
