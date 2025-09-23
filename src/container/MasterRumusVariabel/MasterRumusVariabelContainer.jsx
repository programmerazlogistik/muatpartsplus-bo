"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/Button/Button";
import MasterRumusVariabelTable from "./MasterRumusVariabelTable";
import { 
  useGetFormulaList, 
  transformFormulaListToTableData,
  transformPaginationData 
} from "@/services/masterpricing/masterformulavariable/getFormulaList";

export default function MasterRumusVariabelContainer() {
  const router = useRouter();

  // State for table data and pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingFormulas, setUpdatingFormulas] = useState(new Set());

  // Use API hook to fetch formula list
  const { data, error, isLoading, mutate } = useGetFormulaList({
    search: searchQuery,
    page: currentPage,
    limit: perPage
  });

  // Transform API data for table
  const tableData = data?.data?.Data.data ? transformFormulaListToTableData(data.data.Data.data) : [];
  const paginationData = data?.data?.Data.pagination ? transformPaginationData(data.data.Data.pagination) : {};
  
  // Extract pagination values
  const totalItems = paginationData.totalRecords || 0;
  const totalPages = paginationData.totalPages || 1;
  const loading = isLoading;

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

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the data (in real app, this would be an API call)
      console.log(`Updating formula ${formulaId} status to ${newStatus}`);
      
      // Revalidate data after status change
      mutate();
      
    } catch (error) {
      console.error('Error updating formula status:', error);
    } finally {
      setUpdatingFormulas(prev => {
        const newSet = new Set(prev);
        newSet.delete(formulaId);
        return newSet;
      });
    }
  }, [mutate]);

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
        data={tableData}
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