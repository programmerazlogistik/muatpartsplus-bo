"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/Button/Button";
import MasterRumusVariabelTable from "./MasterRumusVariabelTable";

export default function MasterRumusVariabelContainer() {
  const router = useRouter();

  // State for table data and pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingFormulas, setUpdatingFormulas] = useState(new Set());
  const [loading, setLoading] = useState(false);

  // Dummy data for the table
  const dummyData = [
    {
      id: 1,
      formulaName: "5PL",
      isActive: true,
    },
    {
      id: 2,
      formulaName: "4PL",
      isActive: true,
    },
    {
      id: 3,
      formulaName: "3PL",
      isActive: false,
    },
    {
      id: 4,
      formulaName: "2PL",
      isActive: true,
    },
    {
      id: 5,
      formulaName: "1PL",
      isActive: false,
    },
    {
      id: 6,
      formulaName: "Express",
      isActive: true,
    },
    {
      id: 7,
      formulaName: "Standard",
      isActive: false,
    },
    {
      id: 8,
      formulaName: "Economy",
      isActive: true,
    },
    {
      id: 9,
      formulaName: "Premium",
      isActive: false,
    },
    {
      id: 10,
      formulaName: "Regular",
      isActive: true,
    },
  ];

  // Filter data based on search query
  const filteredData = dummyData.filter((item) =>
    item.formulaName.toLowerCase().includes(searchQuery.toLowerCase())
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

  const handleStatusChange = useCallback(async (formulaId, newStatus) => {
    setUpdatingFormulas(prev => new Set(prev).add(formulaId));
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the data (in real app, this would be an API call)
      console.log(`Updating formula ${formulaId} status to ${newStatus}`);
      
    } catch (error) {
      console.error('Error updating formula status:', error);
    } finally {
      setUpdatingFormulas(prev => {
        const newSet = new Set(prev);
        newSet.delete(formulaId);
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
    console.log('Applied filters:', filters);
    // In a real app, this would trigger an API call with filter parameters
  }, []);

  return (
    <>
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-semibold">Master Nama Rumus & Variabel</h1>
        <Button variant="muatparts-primary" onClick={() => router.push("/master-pricing/master-rumus-variabel/add")}>
          <span className="pt-0.5 font-semibold text-sm">+ Tambah Nama Rumus</span>
        </Button>
      </div>

      <MasterRumusVariabelTable
        data={paginatedData}
        loading={loading}
        updatingFormulas={updatingFormulas}
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
    </>
  );
}