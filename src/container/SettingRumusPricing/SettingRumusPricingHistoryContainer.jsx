"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

import { useGetMasterPricingSettingFormulaPricingHistoryWithParams } from "@/services/masterpricing/setting-formula-pricing/getMasterPricingSettingFormulaPricingHistory";

import PageTitle from "@/components/PageTitle/PageTitle";
import Pagination from "@/components/Pagination/Pagination";
import Table from "@/components/Table/Table";

import { DataTableBO } from "@/components";

export default function SettingRumusPricingHistoryContainer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const { data, isLoading } =
    useGetMasterPricingSettingFormulaPricingHistoryWithParams({
      page: currentPage,
      limit: perPage,
    });

  const [columns, setColumns] = useState([]);

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year}\n${hours}:${minutes} WIB`;
  };

  useEffect(() => {
    if (data?.Data?.history && data.Data.history.length > 0) {
      // Base columns
      const baseColumns = [
        {
          key: "createdAt",
          header: "Waktu Update",
          headerClassName: "justify-center text-center",
          className: "text-center",
          render: (row) => (
            <div className="whitespace-pre-line text-sm font-semibold">
              {formatDate(row.createdAt)}
            </div>
          ),
        },
        {
          key: "action",
          header: "Aktivitas",
          className: "pl-0",
          render: (row) => (
            <span className="text-sm font-semibold">{row.action}</span>
          ),
        },
        {
          key: "createdBy",
          header: "User",
          className: "pl-0",
          render: (row) => (
            <span className="text-sm font-semibold">{row.createdBy}</span>
          ),
        },
      ];

      // Get dynamic columns from the first history item
      const firstHistoryItem = data.Data.history[0];
      const excludedKeys = ["createdAt", "action", "createdBy"];

      // Generate dynamic columns for formula fields
      const dynamicColumns = Object.keys(firstHistoryItem)
        .filter((key) => !excludedKeys.includes(key))
        .map((key) => ({
          key: key,
          header: key.toUpperCase(),
          className: "pl-0",
          render: (row) => (
            <span className="text-sm font-semibold">
              {row[key] !== null && row[key] !== undefined ? row[key] : "-"}
            </span>
          ),
        }));

      // Combine base and dynamic columns
      const allColumns = [...baseColumns, ...dynamicColumns];
      setColumns(allColumns);
    } else {
      // Set empty columns if no data
      setColumns([]);
    }
  }, [data]);

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <div>
      <PageTitle
        withBack={true}
        onBackClick={() => {
          redirect("/master-pricing/setting-rumus-pricing");
        }}
      >
        History Perubahan Data
      </PageTitle>
      <DataTableBO
        columns={columns}
        data={data?.Data?.history || []}
        showSearch={false}
        className={"my-3 flex flex-col gap-2"}
        showPagination={true}
        currentPage={currentPage}
        totalPages={data?.Data?.pagination?.totalPages || 1}
        totalItems={data?.Data?.pagination?.totalItems || 0}
        perPage={perPage}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
        loading={isLoading}
      />
    </div>
  );
}
