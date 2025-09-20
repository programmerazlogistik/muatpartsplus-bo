"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/components/Button/Button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/Collapsible/Collapsible";
import DataTableBO from "@/components/DataTableBO/DataTableBO";
import PageTitle from "@/components/PageTitle/PageTitle";

import { IconComponent } from "@/components";

export default function SettingNilaiVariabelHistoryPage() {
  const router = useRouter();
  const params = useParams();
  const [data] = useState([
    {
      id: 1,
      waktuUpdate: "15 Januari 2024, 10:30",
      aktivitas: "Edit Data",
      user: "Admin Muatrans",
      detail: {
        variableName: "Tarif Dasar",
        oldValue: "12000",
        newValue: "15000",
        unit: "Rupiah",
      },
    },
    {
      id: 2,
      waktuUpdate: "10 Januari 2024, 14:20",
      aktivitas: "Create Data",
      user: "Admin Muatrans",
      detail: {
        variableName: "Tarif Dasar",
        oldValue: "-",
        newValue: "12000",
        unit: "Rupiah",
      },
    },
  ]);

  const handleBack = () => {
    router.push(`/master-pricing/setting-nilai-variabel/${params.id}/detail`);
  };

  const columns = [
    {
      key: "waktuUpdate",
      header: "Waktu Update",
      sortable: true,
      render: (row) => <div>{row.waktuUpdate}</div>,
    },
    {
      key: "aktivitas",
      header: "Aktivitas",
      sortable: true,
      render: (row) => <div>{row.aktivitas}</div>,
    },
    {
      key: "user",
      header: "User",
      sortable: true,
      render: (row) => <div>{row.user}</div>,
    },
    {
      key: "aksi",
      header: "Aksi",
      sortable: false,
      render: () => (
        <Button variant="muatparts-primary-secondary" className="font-semibold">
          Lihat Detail
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageTitle showBackButton={true} onBackClick={handleBack}>
        History Perubahan Data Setting Nilai Variabel
      </PageTitle>

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
            loading={false}
            showFilter={false}
            showSearch={false}
            showPagination={false}
            showTotalCount={false}
            emptyState={
              <div className="flex h-[66px] items-center justify-center">
                <IconComponent
                  src="/icons/search-not-found.svg"
                  width={24}
                  height={24}
                  className="mr-2 !text-[#868686]"
                />
                <p className="text-xs font-semibold text-[#868686]">
                  Belum ada data
                </p>
              </div>
            }
          />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
