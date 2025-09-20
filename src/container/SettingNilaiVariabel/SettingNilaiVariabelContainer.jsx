"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import Button from "@/components/Button/Button";
import PageTitle from "@/components/PageTitle/PageTitle";

import { IconComponent } from "@/components";

import SettingNilaiVariabelTable from "./SettingNilaiVariabelTable";

export default function SettingNilaiVariabelContainer() {
  const router = useRouter();

  // State for table data and pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingVariables, setUpdatingVariables] = useState(new Set());
  const [loading, setLoading] = useState(false);

  // Dummy data for the table
  const dummyData = [
    {
      id: 1,
      truckType: "Engkel",
      formula: "Jarak * Tarif Dasar",
      isActive: true,
    },
    {
      id: 2,
      truckType: "Double",
      formula: null,
      isActive: true,
    },
    {
      id: 3,
      truckType: "Tronton",
      formula: null,
      isActive: false,
    },
    {
      id: 4,
      truckType: "Engkel",
      formula: "Waktu * Tarif Dasar",
      isActive: true,
    },
    {
      id: 5,
      truckType: "Double",
      formula: "Handling + Biaya Tambahan",
      isActive: false,
    },
  ];

  // Filter data based on search query
  const filteredData = dummyData.filter((item) =>
    item.truckType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Event handlers
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handlePerPageChange = useCallback((newPerPage) => {
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to first page when changing per page
  }, []);

  const handleStatusChange = useCallback(async (variableId, newStatus) => {
    setUpdatingVariables((prev) => new Set(prev).add(variableId));
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update the data (in real app, this would be an API call)
      console.log(`Updating variable ${variableId} status to ${newStatus}`);
    } catch (error) {
      console.error("Error updating variable status:", error);
    } finally {
      setUpdatingVariables((prev) => {
        const newSet = new Set(prev);
        newSet.delete(variableId);
        return newSet;
      });
      setLoading(false);
    }
  }, []);

  const handleSort = useCallback((sortField, sortOrder) => {
    console.log(`Sorting by ${sortField} in ${sortOrder} order`);
    // In a real app, this would trigger an API call with sort parameters
  }, []);

  const handleFilter = useCallback((filters) => {
    console.log("Applied filters:", filters);
    // In a real app, this would trigger an API call with filter parameters
  }, []);

  // Show no data state when there's no data
  const showNoData = totalItems === 0 && !loading;

  return (
    <>
      <PageTitle withBack={false}>Setting Nilai Variabel</PageTitle>

      {showNoData ? (
        <div className="mt-3 flex items-center justify-center gap-2">
          <IconComponent src="/icons/search.svg" />
          <span className="text-sm font-semibold text-[#868686]">
            Belum ada data rute pricing
          </span>
        </div>
      ) : (
        <SettingNilaiVariabelTable
          data={paginatedData}
          loading={loading}
          updatingVariables={updatingVariables}
          onSearch={handleSearch}
          onFilter={handleFilter}
          onSort={handleSort}
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
          onStatusChange={handleStatusChange}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          perPage={perPage}
        />
      )}
    </>
  );
}
