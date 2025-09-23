"use client";

import React, { useState } from "react";

import Button from "@/components/Button/Button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/Collapsible/Collapsible";

import { IconComponent } from "@/components";

import SettingDefaultPricingTable from "./SettingDefaultPricingTable";

const RuteKhusus = () => {
  const [data, setData] = useState(true); // Set to true to show collapsibles, false to show no data message
  const [loading, setLoading] = useState(false);
  const [openStates, setOpenStates] = useState({
    jawaJawa: false,
    sumatraKalimantan: false,
  }); // Track open state for each collapsible
  const [showAll, setShowAll] = useState(false); // Track if all should be shown

  // Sample data for the table - replace with your actual data
  const jawaJawaData = [
    {
      id: "1",
      specialRoute: "Jakarta - Surabaya",
      pricing: 2500000,
    },
    {
      id: "2",
      specialRoute: "Bandung - Yogyakarta",
      pricing: 1800000,
    },
    {
      id: "3",
      specialRoute: "Semarang - Malang",
      pricing: 1500000,
    },
  ];

  const sumatraKalimantanData = [
    {
      id: "4",
      specialRoute: "Medan - Pekanbaru",
      pricing: 3200000,
    },
    {
      id: "5",
      specialRoute: "Palembang - Pontianak",
      pricing: 2800000,
    },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Handler functions for table actions
  const handleSearch = (searchTerm) => {
    console.log("Search:", searchTerm);
    // Implement search logic here
  };

  const handleFilter = (filters) => {
    console.log("Filter:", filters);
    // Implement filter logic here
  };

  const handleSort = (sortConfig) => {
    console.log("Sort:", sortConfig);
    // Implement sort logic here
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  // Toggle all collapsibles open/closed
  const handleToggleAll = () => {
    const newShowAll = !showAll;
    setShowAll(newShowAll);

    setOpenStates({
      jawaJawa: newShowAll,
      sumatraKalimantan: newShowAll,
    });
  };

  // Toggle individual collapsible
  const handleToggleCollapsible = (collapsibleKey) => {
    setOpenStates((prev) => ({
      ...prev,
      [collapsibleKey]: !prev[collapsibleKey],
    }));

    // If we're closing one while in "show all" mode, exit show all mode
    if (showAll && openStates[collapsibleKey]) {
      setShowAll(false);
    }
    // If we're opening the last closed one while all others are open, enter show all mode
    else if (!showAll && !openStates[collapsibleKey]) {
      const allOthersOpen = Object.entries(openStates)
        .filter(([key]) => key !== collapsibleKey)
        .every(([, isOpen]) => isOpen);
      if (allOthersOpen) {
        setShowAll(true);
      }
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={handleToggleAll}
          className="rounded-md border border-gray-100 p-2 text-xs font-semibold shadow-sm"
        >
          {showAll ? "Sembunyikan Semua" : "Tampilkan Semua"}
        </button>
      </div>

      {!data ? (
        <div className="mt-3 flex items-center justify-center gap-2">
          <IconComponent src="/icons/search.svg" />
          <span className="text-sm font-semibold text-[#868686]">
            {" "}
            Belum ada data rute pricing
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-y-5">
          {/* First Collapsible Section - Jawa - Jawa */}
          <Collapsible
            className="rounded-lg border border-gray-200"
            open={openStates.jawaJawa}
            onOpenChange={() => handleToggleCollapsible("jawaJawa")}
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-t-lg !border-[#176CF7] bg-gray-50 p-4">
              {({ open }) => (
                <>
                  <span className="font-medium">Jawa - Jawa</span>
                  <svg
                    className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
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
            <CollapsibleContent className="border-t border-gray-200 p-4">
              <SettingDefaultPricingTable
                data={jawaJawaData}
                loading={loading}
                onSearch={handleSearch}
                onFilter={handleFilter}
                onSort={handleSort}
                onPageChange={handlePageChange}
                onPerPageChange={handlePerPageChange}
                currentPage={currentPage}
                totalPages={Math.ceil(jawaJawaData.length / perPage)}
                totalItems={jawaJawaData.length}
                perPage={perPage}
              />
            </CollapsibleContent>
          </Collapsible>

          {/* Second Collapsible Section - Sumatra - Kalimantan */}
          <Collapsible
            className="rounded-lg border border-gray-200"
            open={openStates.sumatraKalimantan}
            onOpenChange={() => handleToggleCollapsible("sumatraKalimantan")}
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-t-lg !border-[#176CF7] bg-gray-50 p-4">
              {({ open }) => (
                <>
                  <span className="font-medium">Sumatra - Kalimantan</span>
                  <svg
                    className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
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
            <CollapsibleContent className="border-t border-gray-200 p-4">
              <SettingDefaultPricingTable
                data={sumatraKalimantanData}
                loading={loading}
                onSearch={handleSearch}
                onFilter={handleFilter}
                onSort={handleSort}
                onPageChange={handlePageChange}
                onPerPageChange={handlePerPageChange}
                currentPage={currentPage}
                totalPages={Math.ceil(sumatraKalimantanData.length / perPage)}
                totalItems={sumatraKalimantanData.length}
                perPage={perPage}
              />
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}
    </div>
  );
};

export default RuteKhusus;
