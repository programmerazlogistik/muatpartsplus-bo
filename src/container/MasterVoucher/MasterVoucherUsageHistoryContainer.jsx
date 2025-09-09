"use client";

import { useEffect, useState } from "react";

import PageTitle from "@/components/PageTitle/PageTitle";

import MasterVoucherUsageHistoryTable from "./MasterVoucherUsageHistoryTable";

const MasterVoucherUsageHistoryContainer = ({ voucherId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ sort: null, order: null });

  useEffect(() => {
    const mockData = [
      {
        id: 1,
        userId: "34875",
        companyName: "Budi",
        phoneNumber: "08123736434",
        emailUser: "-",
        paymentDate: "05/07/2023",
        invoiceNumber: "INV/MT/001-20230704023274",
        claimValue: "Rp95.000",
      },
      {
        id: 2,
        userId: "34875",
        companyName: "PT Jaya Logistik",
        phoneNumber: "08123736434",
        emailUser: "adul.jayalogistik@gmail.com",
        paymentDate: "04/07/2023",
        invoiceNumber: "INV/MT/001-20230704023273",
        claimValue: "Rp95.000",
      },
    ];

    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setData(mockData);
      setTotalItems(mockData.length);
      setTotalPages(Math.ceil(mockData.length / perPage));
      setLoading(false);
    }, 1000);
  }, [voucherId, perPage]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    // TODO: Implement search functionality
  };

  const handleFilter = (filters) => {
    // TODO: Implement filter functionality
  };

  const handleSort = (sort, order) => {
    setSortConfig({ sort, order });
    // TODO: Implement sort functionality
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // TODO: Implement page change functionality
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
    // TODO: Implement per page change functionality
  };

  return (
    <div className="flex h-full flex-col">
      <PageTitle withBack={false} className="mb-6">History Pemakaian Voucher</PageTitle>

      <div className="flex-1">
        <MasterVoucherUsageHistoryTable
          data={data}
          loading={loading}
          onSearch={handleSearch}
          onFilter={handleFilter}
          onSort={handleSort}
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          perPage={perPage}
        />
      </div>
    </div>
  );
};

export default MasterVoucherUsageHistoryContainer;
