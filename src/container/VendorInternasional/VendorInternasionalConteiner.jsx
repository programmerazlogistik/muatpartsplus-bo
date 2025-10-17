"use client";

import { useState } from "react";

import { cn } from "@muatmuat/lib/utils";

import { useGetVendorsInternational } from "@/services/vendorInternasional/useGetVendorsInternasional";

// import { useGetVendorsInternasional } from "@/services/vendorInternasional/useGetVendorsInternasional";
import PageTitle from "@/components/PageTitle/PageTitle";

import VendorInternationalTable from "./VendorInternationalTable";

// Main page component
const VendorInternationalContainer = () => {
  const { data: vendorData, isLoading, error } = useGetVendorsInternational();
  const [activeTab, setActiveTab] = useState("Transaksi");
  const tabs = ["Transaksi", "Pengajuan", "Riwayat"];
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

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
      <PageTitle>"Vendor International"</PageTitle>

      <div className="flex justify-center">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "h-[30px] basis-0 border px-8 py-2 text-center text-xs font-semibold",
              activeTab === tab
                ? "z-10 border-[#176CF7] bg-[#176CF7] text-white"
                : "border-[#868686] bg-white text-[#868686]",
              index === 0 ? "rounded-l-md" : "",
              index === tabs.length - 1 ? "rounded-r-md" : "",
              index > 0 ? "-ml-px" : ""
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Transaksi" && (
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
      )}
      {activeTab === "Pengajuan" && (
        <div className="p-10 text-center">Content for Pengajuan</div>
      )}
      {activeTab === "Riwayat" && (
        <div className="p-10 text-center">Content for Riwayat</div>
      )}
    </div>
  );
};

export default VendorInternationalContainer;
