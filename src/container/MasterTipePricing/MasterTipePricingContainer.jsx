"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/Button/Button";
import MasterTipePricingTable from "./MasterTipePricingTable";

export default function MasterTipePricingContainer() {
  const router = useRouter();
  
  // State for table data and pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingTypes, setUpdatingTypes] = useState(new Set());
  const [loading, setLoading] = useState(false);

  // Dummy data for the table
  const dummyData = [
    {
      id: 1,
      typeName: "Medium",
      isActive: true,
    },
    {
      id: 2,
      typeName: "Low",
      isActive: true,
    },
    {
      id: 3,
      typeName: "High",
      isActive: false,
    },
    {
      id: 4,
      typeName: "Premium",
      isActive: true,
    },
    {
      id: 5,
      typeName: "Standard",
      isActive: false,
    },
    {
      id: 6,
      typeName: "Economy",
      isActive: true,
    },
    {
      id: 7,
      typeName: "Express",
      isActive: false,
    },
    {
      id: 8,
      typeName: "Regular",
      isActive: true,
    },
  ];

  // Filter data based on search query
  const filteredData = dummyData.filter((item) =>
    item.typeName.toLowerCase().includes(searchQuery.toLowerCase())
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

  const handleStatusChange = useCallback(async (typeId, newStatus) => {
    setUpdatingTypes(prev => new Set(prev).add(typeId));
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the data (in real app, this would be an API call)
      console.log(`Updating type ${typeId} status to ${newStatus}`);
      
    } catch (error) {
      console.error('Error updating type status:', error);
    } finally {
      setUpdatingTypes(prev => {
        const newSet = new Set(prev);
        newSet.delete(typeId);
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
        <h1 className="text-xl font-semibold">Master Tipe Pricing</h1>
        <Button variant="muatparts-primary" onClick={() => router.push("/master-pricing/master-tipe-pricing/add")}>
          <span className="pt-0.5 font-semibold text-sm">+ Tambah Tipe Pricing</span>
        </Button>
      </div>

      <MasterTipePricingTable
        data={paginatedData}
        loading={loading}
        updatingTypes={updatingTypes}
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