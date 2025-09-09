"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/Button/Button";

import { useTranslation } from "@/hooks/use-translation";

import { cn } from "@/lib/utils";

import MasterVoucherFilter from "./MasterVoucherFilter";
import MasterVoucherTable from "./MasterVoucherTable";

const MasterVoucherContainer = () => {
  const { t = (key, _, fallback) => fallback || key } = useTranslation() || {};
  const [activeTab, setActiveTab] = useState("active"); // active or expired
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [sorting, setSorting] = useState({ sort: null, order: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [vouchers, setVouchers] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const mockVouchers = [
    {
      id: 1,
      isActive: true,
      createdDate: "03/07/2023",
      createdTime: "15:27 WIB",
      startDate: "04/07/2023",
      endDate: "04/07/2024",
      voucherCode: "DiskonMantap",
      discountType: "fixed",
      discountValue: 10000,
      maxDiscount: null,
      remainingQuota: 500,
      totalQuota: 750,
      totalClaims: 8,
      uniqueUsers: 2,
      totalClaimValue: 2500000,
    },
    {
      id: 2,
      isActive: false,
      createdDate: "03/07/2023",
      createdTime: "15:27 WIB",
      startDate: "04/07/2023",
      endDate: "04/07/2024",
      voucherCode: "DiskonSuperHemat",
      discountType: "percentage",
      discountValue: 10,
      maxDiscount: 1000000,
      remainingQuota: 750,
      totalQuota: 1000,
      totalClaims: 250,
      uniqueUsers: 20,
      totalClaimValue: 13500000,
    },
    {
      id: 3,
      isActive: false,
      createdDate: "03/07/2023",
      createdTime: "15:27 WIB",
      startDate: "04/07/2023",
      endDate: "04/07/2024",
      voucherCode: "DiskonSuperHemat",
      discountType: "percentage",
      discountValue: 10,
      maxDiscount: 1000000,
      remainingQuota: 750,
      totalQuota: 1000,
      totalClaims: 250,
      uniqueUsers: 20,
      totalClaimValue: 13500000,
    },
  ];

  useEffect(() => {
    // Fetch vouchers from API or use mock data
    fetchVouchers();
  }, [activeTab, searchQuery, filters, sorting, currentPage, perPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchVouchers = async () => {
    setLoading(true);

    try {
      // In a real application, you would fetch data from an API
      // const response = await apiClient.get('/vouchers', {
      //   params: {
      //     isExpired: activeTab === 'expired',
      //     search: searchQuery,
      //     ...filters,
      //     sortBy: sorting.sort,
      //     sortOrder: sorting.order,
      //     page: currentPage,
      //     limit: perPage
      //   }
      // });

      // Simulate API call with mock data
      setTimeout(() => {
        // Filter by active/expired status
        const filteredVouchers = mockVouchers.filter((voucher) =>
          activeTab === "expired" ? !voucher.isActive : voucher.isActive
        );

        // Filter by search query if provided
        const searchResults = searchQuery
          ? filteredVouchers.filter((v) =>
              v.voucherCode.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : filteredVouchers;

        setVouchers(searchResults);
        setTotalItems(searchResults.length);
        setTotalPages(Math.max(1, Math.ceil(searchResults.length / perPage)));
        setLoading(false);
      }, 500); // Simulate delay
    } catch (error) {
      console.error("Error fetching vouchers:", error);
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleSort = (sort, order) => {
    setSorting({ sort, order });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page on tab change
  };
  const router = useRouter();
  const handleAddVoucher = () => {
    router.push("/master-voucher/add");
  };

  const handleToggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold">
        {t("MasterVoucher.title", {}, "Master Voucher")}
      </h1>
      <div className="flex w-full items-center justify-between py-[14px]">
        <div className="flex gap-0">
          <Button
            variant={
              activeTab === "active"
                ? "muatparts-primary"
                : "muatparts-primary-secondary"
            }
            className={cn(
              "min-w-[200px] rounded-[4px] rounded-r-none px-6 py-2 text-sm font-semibold",
              activeTab === "active"
                ? "z-10"
                : "border-[#868686] text-[#868686] hover:bg-neutral-100"
            )}
            onClick={() => handleTabChange("active")}
          >
            {t("MasterVoucher.activeTab", {}, "Belum Kedaluwarsa")}
          </Button>
          <Button
            variant={
              activeTab === "expired"
                ? "muatparts-primary"
                : "muatparts-primary-secondary"
            }
            className={cn(
              "-ml-px min-w-[200px] rounded-[4px] rounded-l-none px-6 py-2 text-sm font-semibold",
              activeTab === "expired"
                ? "z-10 border-[#0066FF] text-white"
                : "border-[#868686] text-[#868686] hover:bg-neutral-100"
            )}
            onClick={() => handleTabChange("expired")}
          >
            {t("MasterVoucher.expiredTab", {}, "Sudah Kedaluwarsa")}
          </Button>
        </div>

        <div className="flex items-center justify-end gap-[10px]">
          <Button variant="muatparts-primary" onClick={handleAddVoucher}>
            + {t("MasterVoucher.addButton", {}, "Tambah")}
          </Button>

          <Button
            variant="muatparts-primary-secondary"
            onClick={handleToggleFilter}
          >
            {t("MasterVoucher.filterButton", {}, "Filter")}
          </Button>
        </div>
      </div>
      <MasterVoucherFilter
        isOpen={isFilterOpen}
        onToggle={handleToggleFilter}
        onApply={handleFilter}
        onReset={handleFilter}
        initialFilters={filters}
        isExpired={activeTab === "expired"}
      />
      <MasterVoucherTable
        isExpired={activeTab === "expired"}
        data={vouchers}
        loading={loading}
        onSearch={handleSearch}
        onFilter={handleFilter}
        onSort={handleSort}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        perPage={perPage}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
      />
    </div>
  );
};

export default MasterVoucherContainer;
