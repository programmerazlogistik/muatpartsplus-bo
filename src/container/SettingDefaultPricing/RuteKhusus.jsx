"use client";

import React, { useState } from "react";

import Button from "@/components/Button/Button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/Collapsible/Collapsible";
import SettingDefaultPricingTable from "./SettingDefaultPricingTable";

import { IconComponent } from "@/components";

const RuteKhusus = () => {
  const [data, setData] = useState(true); // Set to true to show collapsibles, false to show no data message
  const [loading, setLoading] = useState(false);
  
  // Sample data for the table - replace with your actual data
  const jawaJawaData = [
    {
      id: "1",
      specialRoute: "Jakarta - Surabaya",
      pricing: 2500000
    },
    {
      id: "2", 
      specialRoute: "Bandung - Yogyakarta",
      pricing: 1800000
    },
    {
      id: "3",
      specialRoute: "Semarang - Malang",
      pricing: 1500000
    }
  ];

  const sumatraKalimantanData = [
    {
      id: "4",
      specialRoute: "Medan - Pekanbaru",
      pricing: 3200000
    },
    {
      id: "5",
      specialRoute: "Palembang - Pontianak",
      pricing: 2800000
    }
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

  return (
    <div>
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
          <Collapsible className="rounded-lg border border-gray-200">
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-t-lg bg-gray-50 p-4">
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
          <Collapsible className="rounded-lg border border-gray-200">
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-t-lg bg-gray-50 p-4">
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

          <div className="flex justify-center">
            <Button variant="muatparts-primary">Simpan</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RuteKhusus;