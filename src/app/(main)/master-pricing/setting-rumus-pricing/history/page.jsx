"use client";

import { redirect } from "next/navigation";

import PageTitle from "@/components/PageTitle/PageTitle";
import Pagination from "@/components/Pagination/Pagination";
import Table from "@/components/Table/Table";

import { DataTableBO } from "@/components";

export default function HistorySettingRumusPricing() {
  // Mock data for the history table
  const mockHistoryData = [
    {
      id: 1,
      waktu_update: "08/07/2023\n08:55 WIB",
      aktivitas: "Update",
      user: "John",
      formula_4pl: "d+((a-d)/(1+(x/c)^b))",
      formula_5pl: "d+(((a-d)/(1+(x/c)^b))+m)",
    },
    {
      id: 2,
      waktu_update: "08/07/2023\n08:50 WIB",
      aktivitas: "Update",
      user: "John",
      formula_4pl: "d+((a-d)/(1+(x/c)^b))",
      formula_5pl: "d+(((a-d)/(1+(x/c)^b))^m)",
    },
    {
      id: 3,
      waktu_update: "07/07/2023\n14:30 WIB",
      aktivitas: "Update",
      user: "Sarah",
      formula_4pl: "a+((b-a)/(1+(jarak/c)^d))",
      formula_5pl: "a+((b-a)/(1+(jarak/c)^d))+tonase",
    },
    {
      id: 4,
      waktu_update: "06/07/2023\n11:15 WIB",
      aktivitas: "Create",
      user: "Admin",
      formula_4pl: "100+jarak*2+tonase*50",
      formula_5pl: "120+jarak*2.5+tonase*60+volume*10",
    },
    {
      id: 5,
      waktu_update: "05/07/2023\n16:45 WIB",
      aktivitas: "Update",
      user: "Michael",
      formula_4pl: "a*jarak+b*tonase+c",
      formula_5pl: "a*jarak+b*tonase+c*volume+d",
    },
  ];

  const columns = [
    {
      key: "waktu_update",
      header: "Waktu Update",
      headerClassName: "justify-center text-center",
      className: "text-center",
      render: (row) => (
        <div className="whitespace-pre-line text-sm font-semibold">
          {row.waktu_update}
        </div>
      ),
    },
    {
      key: "aktivitas",
      header: "Aktivitas",
      className: "pl-0",
      render: (row) => (
        <span className="text-sm font-semibold">{row.aktivitas}</span>
      ),
    },
    {
      key: "user",
      header: "User",
      className: "pl-0",
      render: (row) => (
        <span className="text-sm font-semibold">{row.user}</span>
      ),
    },
    {
      key: "formula_4pl",
      header: "4PL",
      className: "pl-0",
      render: (row) => (
        <div className="max-w-xs break-all text-sm font-semibold">
          {row.formula_4pl}
        </div>
      ),
    },
    {
      key: "formula_5pl",
      header: "5PL",
      className: "pl-0",
      render: (row) => (
        <div className="max-w-xs break-all text-sm font-semibold">
          {row.formula_5pl}
        </div>
      ),
    },
  ];

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
        data={mockHistoryData}
        showSearch={false}
        className={"my-3 flex flex-col gap-2"}
        showPagination={true}
        currentPage={1}
        totalPages={1}
        totalItems={mockHistoryData.length}
        perPage={10}
        loading={false}
      />
    </div>
  );
}
