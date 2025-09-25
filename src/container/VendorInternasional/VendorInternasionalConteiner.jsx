"use client";

import React, { useState } from "react";

import { useGetVendorsInternasional } from "@/services/vendorInternasional/useGetVendorsInternasional";

import Button from "@/components/Button/Button";
import Dropdown from "@/components/Dropdown/Dropdown";
import IconComponent from "@/components/IconComponent/IconComponent";
import PageTitle from "@/components/PageTitle/PageTitle";
import VendorInternationalTable from "./VendorInternationalTable";

import { useTranslation } from "@/hooks/use-translation";

import { cn } from "@/lib/utils";

// Main page component
const VendorInternationalContainer = () => {
  const { t } = useTranslation();
  const { data: vendorData, isLoading, error } = useGetVendorsInternasional();
  const [activeTab, setActiveTab] = useState("transaksi");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const handleTabChange = (tab) => setActiveTab(tab);

  // Extract data
  const vendors = vendorData?.vendors || [];
  const pagination = vendorData?.pagination || {};

  const handleSearch = (searchValue) => {
    // Implement search logic
    console.log("Search:", searchValue);
  };

  const handleFilter = (filters) => {
    // Implement filter logic
    console.log("Filter:", filters);
  };

  const handleSort = (sortKey, sortOrder) => {
    // Implement sort logic
    console.log("Sort:", sortKey, sortOrder);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Implement pagination logic
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
    // Implement per page change logic
  };

  if (isLoading) return <div>Loading...</div>; // TODO: Replace with a proper Skeleton Loader component
  if (error) return <div>Error loading data.</div>; // TODO: Replace with a proper Error component

  return (
    <div className="space-y-[10px] bg-neutral-50 p-6">
      <PageTitle>
        {t("VendorInternational.title", {}, "Vendor International")}
      </PageTitle>

      <div className="flex items-center justify-center pb-4">
        <Button
          variant={
            activeTab === "active"
              ? "muatparts-primary"
              : "muatparts-primary-secondary"
          }
          className={cn(
            "min-w-[148px] rounded-[4px] rounded-r-none px-6 py-2 text-sm font-semibold",
            activeTab === "active"
              ? "z-10"
              : "border-[#868686] text-[#868686] hover:bg-neutral-100"
          )}
          onClick={() => handleTabChange("transaction")}
        >
          Transaksi
        </Button>
        <Button
          variant={
            activeTab === "expired"
              ? "muatparts-primary"
              : "muatparts-primary-secondary"
          }
          className={cn(
            "-ml-px min-w-[148px] rounded-[4px] rounded-l-none px-6 py-2 text-sm font-semibold",
            activeTab === "expired"
              ? "z-10 border-[#0066FF] text-white"
              : "border-[#868686] text-[#868686] hover:bg-neutral-100"
          )}
          onClick={() => handleTabChange("submission")}
        >
          Pengajuan
        </Button>
        <Button
          variant={
            activeTab === "expired"
              ? "muatparts-primary"
              : "muatparts-primary-secondary"
          }
          className={cn(
            "-ml-px min-w-[148px] rounded-[4px] rounded-l-none px-6 py-2 text-sm font-semibold",
            activeTab === "expired"
              ? "z-10 border-[#0066FF] text-white"
              : "border-[#868686] text-[#868686] hover:bg-neutral-100"
          )}
          onClick={() => handleTabChange("history")}
        >
          Riwayat
        </Button>
      </div>

      <VendorInternationalTable
        data={vendors}
        loading={isLoading}
        onSearch={handleSearch}
        onFilter={handleFilter}
        onSort={handleSort}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
        currentPage={pagination.currentPage || currentPage}
        totalPages={pagination.totalPages || 1}
        totalItems={pagination.totalItems || vendors.length}
        perPage={pagination.itemsPerPage || perPage}
      />
    </div>
  );
};

export default VendorInternationalContainer;
