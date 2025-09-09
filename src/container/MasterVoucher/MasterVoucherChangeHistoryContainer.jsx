"use client";

import { useEffect, useState } from "react";

import PageTitle from "@/components/PageTitle/PageTitle";

import MasterVoucherChangeHistoryTable from "./MasterVoucherChangeHistoryTable";

const MasterVoucherChangeHistoryContainer = ({ voucherId }) => {
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
        updateTime: "08/07/2023",
        updateDate: "10:50 WIB",
        activity: "Update",
        user: "John",
        termsConditions:
          "Nikmati diskon 15% hingga maksimal Rp100.000 untuk setiap transaksi pengiriman! Jangan lewatkan kesempatan hemat ini. Berlaku untuk semua pengguna, pastikan kamu menggunakan kesempatan ini sebelum promo berakhir!",
        paymentMethods:
          "Nikmati diskon 15% hingga maksimal Rp100.000 untuk setiap transaksi pengiriman! Jangan lewatkan kesempatan hemat ini. Berlaku untuk semua pengguna, pastikan kamu menggunakan kesempatan ini sebelum promo berakhir!",
        validPeriod: {
          start: "04/07/2023",
          end: "04/07/2024",
        },
        userType: [
          { label: "082362374621", value: "082362374621" },
          { label: "082362374622", value: "082362374622" },
          { label: "082362374623", value: "082362374623" },
          { label: "082362374624", value: "082362374624" },
          { label: "082362374625", value: "082362374625" },
          { label: "082362374626", value: "082362374626" },
        ],
        quota: "1.000",
        quotaPerUser: "3",
        paymentInstallment: [
          { label: "Transfer Virtual Account - ECA", value: "va-eca" },
          { label: "Transfer Virtual Account - Mandiri", value: "va-mandiri" },
          { label: "Transfer Virtual Account - Danamon", value: "va-danamon" },
          { label: "Transfer Virtual Account - BRI", value: "va-bri" },
          { label: "Transfer Virtual Account - BNI", value: "va-bni" },
          { label: "Transfer Virtual Account - BCA", value: "va-bca" },
          { label: "Credit Card", value: "cc" },
          { label: "OVO", value: "ovo" },
        ],
        location: [
          { label: "Jawa Timur - Kab. Jember", value: "jatim-jember" },
          { label: "Jawa Timur - Kab. Madiun", value: "jatim-madiun" },
          { label: "Jawa Timur - Kab. Malang", value: "jatim-malang" },
          { label: "Jawa Timur - Kab. Surabaya", value: "jatim-surabaya" },
          { label: "Jawa Timur - Kab. Sidoarjo", value: "jatim-sidoarjo" },
          { label: "Jawa Timur - Kab. Gresik", value: "jatim-gresik" },
          { label: "Jawa Timur - Kab. Mojokerto", value: "jatim-mojokerto" },
          { label: "Jawa Timur - Kab. Kediri", value: "jatim-kediri" },
        ],
        originLocation: [
          { label: "DKI Jakarta - Semua Kota/Kabupaten", value: "dki-all" },
        ],
        status: "Aktif",
      },
      {
        id: 2,
        updateTime: "08/07/2023",
        updateDate: "08:50 WIB",
        activity: "Create",
        user: "John",
        termsConditions:
          "Nikmati diskon 15% hingga maksimal Rp100.000 untuk setiap transaksi pengiriman! Jangan lewatkan kesempatan hemat ini. Berlaku untuk semua pengguna, pastikan kamu menggunakan kesempatan ini sebelum promo berakhir!",
        paymentMethods:
          "Nikmati diskon 15% hingga maksimal Rp100.000 untuk setiap transaksi pengiriman! Jangan lewatkan kesempatan hemat ini. Berlaku untuk semua pengguna, pastikan kamu menggunakan kesempatan ini sebelum promo berakhir!",
        validPeriod: {
          start: "04/07/2023",
          end: "04/07/2024",
        },
        userType: [
          { label: "082362374621", value: "082362374621" },
          { label: "082362374622", value: "082362374622" },
          { label: "082362374623", value: "082362374623" },
          { label: "082362374624", value: "082362374624" },
          { label: "082362374625", value: "082362374625" },
          { label: "082362374626", value: "082362374626" },
        ],
        quota: "1.000",
        quotaPerUser: "3",
        paymentInstallment: [
          { label: "Transfer Virtual Account - ECA", value: "va-eca" },
          { label: "Transfer Virtual Account - Mandiri", value: "va-mandiri" },
          { label: "Transfer Virtual Account - Danamon", value: "va-danamon" },
          { label: "Transfer Virtual Account - BRI", value: "va-bri" },
          { label: "Transfer Virtual Account - BNI", value: "va-bni" },
          { label: "Transfer Virtual Account - BCA", value: "va-bca" },
          { label: "Credit Card", value: "cc" },
          { label: "OVO", value: "ovo" },
        ],
        location: [
          { label: "Jawa Timur - Kab. Jember", value: "jatim-jember" },
          { label: "Jawa Timur - Kab. Madiun", value: "jatim-madiun" },
          { label: "Jawa Timur - Kab. Malang", value: "jatim-malang" },
          { label: "Jawa Timur - Kab. Surabaya", value: "jatim-surabaya" },
          { label: "Jawa Timur - Kab. Sidoarjo", value: "jatim-sidoarjo" },
          { label: "Jawa Timur - Kab. Gresik", value: "jatim-gresik" },
          { label: "Jawa Timur - Kab. Mojokerto", value: "jatim-mojokerto" },
          { label: "Jawa Timur - Kab. Kediri", value: "jatim-kediri" },
        ],
        originLocation: [
          { label: "DKI Jakarta - Semua Kota/Kabupaten", value: "dki-all" },
        ],
        status: "Aktif",
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
      <PageTitle className="mb-6"> History Perubahan Data</PageTitle>

      <div className="flex-1">
        <MasterVoucherChangeHistoryTable
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

export default MasterVoucherChangeHistoryContainer;
