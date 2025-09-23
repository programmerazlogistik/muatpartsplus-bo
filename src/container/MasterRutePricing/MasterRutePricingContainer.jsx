"use client";

import { Plus } from "lucide-react";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/Button/Button";
import MasterRutePricingTable from "./MasterRutePricingTable";
import { useGetRouteList, transformRouteListToTableData } from "@/services/masterpricing/masterrute/getRouteList";
import { patchStatusRoute } from "@/services/masterpricing/masterrute/patchStatusRoute";

export default function MasterRutePricingContainer() {
  const router = useRouter();
  // State for table data and pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingRoutes, setUpdatingRoutes] = useState(new Set());

  // Use API hook to fetch route list
  const { data: apiResponse, error, isLoading, mutate } = useGetRouteList({
    search: searchQuery,
    page: currentPage,
    limit: perPage
  });
  
  // Transform API data for table usage
  const tableData = apiResponse?.data?.Data ? transformRouteListToTableData(apiResponse?.data?.Data) : [];
  const paginationData = apiResponse?.data?.Pagination || {};

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

  const handleStatusChange = useCallback(async (routeId, newStatus) => {
    console.log(`Starting status update for route ${routeId} to ${newStatus}`);
    setUpdatingRoutes(prev => new Set(prev).add(routeId));

    try {
      // Call API to update route status using patchStatusRoute
      const statusData = { isActive: newStatus };
      console.log('Calling patchStatusRoute with:', { routeId, statusData });
      
      const response = await patchStatusRoute(routeId, statusData);
      
      console.log(`Route ${routeId} status updated to ${newStatus}:`, response);
      
      // Revalidate data after successful update
      mutate();
      
    } catch (error) {
      console.error('Error updating route status:', error);
      alert(`Gagal mengupdate status: ${error.message}`);
    } finally {
      setUpdatingRoutes(prev => {
        const newSet = new Set(prev);
        newSet.delete(routeId);
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
        <h1 className="text-xl font-semibold">Master Rute Pricing</h1>
        <Button variant="muatparts-primary" onClick={() => router.push("/master-pricing/master-rute-pricing/add")}>
          <span className="pt-0.5 font-semibold text-sm">+ Tambah Rute</span>
        </Button>
      </div>

        <MasterRutePricingTable
          data={tableData}
          loading={loading}
          updatingRoutes={updatingRoutes}
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
