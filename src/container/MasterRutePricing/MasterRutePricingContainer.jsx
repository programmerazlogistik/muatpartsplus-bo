"use client";

import { Plus } from "lucide-react";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/Button/Button";
import MasterRutePricingTable from "./MasterRutePricingTable";

export default function MasterRutePricingContainer() {
  const router = useRouter();
  // State for table data and pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingRoutes, setUpdatingRoutes] = useState(new Set());
  const [loading, setLoading] = useState(false);

  // Dummy data for the table
  const dummyData = [
    {
      id: 1,
      alias: "Jawa - Sumatera",
      originProvince: "Banten, Daerah Istimewa Yogyakarta, DKI Jakarta, Jawa Barat, Jawa Tengah, Jawa Timur",
      destinationProvince: "Banten, Daerah Istimewa Yogyakarta, DKI Jakarta, Jawa Barat, Jawa Tengah, Jawa Timur",
      isActive: true,
    },
    {
      id: 2,
      alias: "Jawa - Jawa",
      originProvince: "Banten, Daerah Istimewa Yogyakarta, DKI Jakarta, Jawa Barat, Jawa Tengah, Jawa Timur",
      destinationProvince: "Banten, Daerah Istimewa Yogyakarta, DKI Jakarta, Jawa Barat, Jawa Tengah, Jawa Timur",
      isActive: true,
    },
    {
      id: 3,
      alias: "Sumatera - Kalimantan",
      originProvince: "Aceh, Sumatera Utara, Sumatera Barat, Riau, Kepulauan Riau, Jambi, Sumatera Selatan, Bangka Belitung, Lampung",
      destinationProvince: "Kalimantan Barat, Kalimantan Tengah, Kalimantan Selatan, Kalimantan Timur, Kalimantan Utara",
      isActive: false,
    },
    {
      id: 4,
      alias: "Sulawesi - Papua",
      originProvince: "Sulawesi Utara, Gorontalo, Sulawesi Tengah, Sulawesi Selatan, Sulawesi Tenggara, Sulawesi Barat",
      destinationProvince: "Papua, Papua Barat, Papua Selatan, Papua Tengah, Papua Pegunungan",
      isActive: true,
    },
    {
      id: 5,
      alias: "Bali - Nusa Tenggara",
      originProvince: "Bali",
      destinationProvince: "Nusa Tenggara Barat, Nusa Tenggara Timur",
      isActive: false,
    },
  ];

  // Filter data based on search query
  const filteredData = dummyData.filter((item) =>
    item.alias.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.originProvince.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.destinationProvince.toLowerCase().includes(searchQuery.toLowerCase())
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

  const handleStatusChange = useCallback(async (routeId, newStatus) => {
    setUpdatingRoutes(prev => new Set(prev).add(routeId));
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the data (in real app, this would be an API call)
      console.log(`Updating route ${routeId} status to ${newStatus}`);
      
    } catch (error) {
      console.error('Error updating route status:', error);
    } finally {
      setUpdatingRoutes(prev => {
        const newSet = new Set(prev);
        newSet.delete(routeId);
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
        <h1 className="text-xl font-semibold">Master Rute Pricing</h1>
        <Button variant="muatparts-primary" onClick={() => router.push("/master-pricing/master-rute-pricing/add")}>
          <span className="pt-0.5 font-semibold text-sm">+ Tambah Rute</span>
        </Button>
      </div>

        <MasterRutePricingTable
          data={paginatedData}
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
