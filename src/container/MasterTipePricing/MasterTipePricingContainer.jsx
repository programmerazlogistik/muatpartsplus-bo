"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/Button/Button";
import MasterTipePricingTable from "./MasterTipePricingTable";
import { 
  useGetTypeList, 
  transformTypeListToTableData,
  transformPaginationData 
} from "@/services/masterpricing/mastertype/getTypeList";
import { patchTypeStatusWithValidation } from "@/services/masterpricing/mastertype/patchTypeStatus";

export default function MasterTipePricingContainer() {
  const router = useRouter();
  
  // State for table data and pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingTypes, setUpdatingTypes] = useState(new Set());

  // Use API hook to fetch type list
  const { data, error, isLoading, mutate } = useGetTypeList({
    search: searchQuery,
    page: currentPage,
    limit: perPage
  });

  // Transform API data for table
  const tableData = data?.data.Data ? transformTypeListToTableData(data.data.Data) : [];
  const paginationData = data?.data.Pagination ? transformPaginationData(data.data.Pagination) : {};
  
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

  const handleStatusChange = useCallback(async (typeId, newStatus) => {
    console.log(`Starting status update for type ${typeId} to ${newStatus}`);
    setUpdatingTypes(prev => new Set(prev).add(typeId));

    try {
      // Call API to update type status using patchTypeStatusWithValidation
      const statusData = { isActive: newStatus };
      console.log('Calling patchTypeStatusWithValidation with:', { typeId, statusData });
      
      const response = await patchTypeStatusWithValidation(typeId, statusData);
      
      console.log(`Type ${typeId} status updated to ${newStatus}:`, response);
      
      // Revalidate data after successful update
      mutate();
      
    } catch (error) {
      console.error('Error updating type status:', error);
      alert(`Gagal mengupdate status: ${error.message}`);
    } finally {
      setUpdatingTypes(prev => {
        const newSet = new Set(prev);
        newSet.delete(typeId);
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
        <h1 className="text-xl font-semibold">Master Tipe Pricing</h1>
        <Button variant="muatparts-primary" onClick={() => router.push("/master-pricing/master-tipe-pricing/add")}>
          <span className="pt-0.5 font-semibold text-sm">+ Tambah Tipe Pricing</span>
        </Button>
      </div>

      <MasterTipePricingTable
        data={tableData}
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