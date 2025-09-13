"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/components/Button/Button";

import { useTranslation } from "@/hooks/use-translation";

import { cn } from "@/lib/utils";

import { useGetVouchers } from "@/services/mastervoucher/getVouchers";
import { updateVoucherStatusById } from "@/services/mastervoucher/updateVoucherStatus";

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
  const [updatingVouchers, setUpdatingVouchers] = useState(new Set());

  // Mapping table column keys to API sortBy values
  const sortKeyMapping = {
    createdAt: "createdAt",
    validPeriod: "validPeriodStart", // Use start date for period sorting
    voucherCode: "voucherCode", 
    discount: "discountValue",
    maxDiscount: "discountValue", // Max discount also relates to discount value
    quota: "totalQuota",
    claims: "totalQuota", // Claims relate to quota usage
    totalClaimValue: "totalQuota", // Total claim value relates to quota
    status: "isActive",
    validPeriodStart: "validPeriodStart",
    validPeriodEnd: "validPeriodEnd",
    discountValue: "discountValue",
    totalQuota: "totalQuota",
    isActive: "isActive"
  };

  // API parameters
  const apiParams = {
    is_expired: activeTab === "expired",
    page: currentPage,
    limit: perPage,
    sortBy: sorting.sort ? (sortKeyMapping[sorting.sort] || "createdAt") : "createdAt",
    sortOrder: (sorting.order || "desc").toUpperCase(),
    ...(searchQuery && { search: searchQuery }),
    ...filters,
  };

  // Use SWR hook to fetch vouchers
  const {
    data: apiResponse,
    error,
    isLoading: loading,
    mutate,
  } = useGetVouchers(apiParams);

  // Extract data from API response
  const rawVouchers = apiResponse?.data?.Data?.data || [];
  const pagination = apiResponse?.data?.Data?.pagination || {};
  const totalItems = pagination.total || 0;
  const totalPages = pagination.totalPages || 1;

  // Transform API data to match table expectations
  const vouchers = rawVouchers.map((voucher) => {
    // Parse dates from API response
    const createdDate = new Date(voucher.createdAt);
    const startDate = new Date(voucher.validPeriodStart);
    const endDate = new Date(voucher.validPeriodEnd);

    return {
      id: voucher.id,
      isActive: voucher.isActive,
      createdDate: createdDate.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      createdTime: `${createdDate.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Jakarta",
      })} WIB`,
      startDate: startDate.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      endDate: endDate.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      voucherCode: voucher.voucherCode,
      discountType: voucher.discountType,
      discountValue: parseFloat(voucher.discountValue),
      maxDiscount: voucher.maxDiscountAmount,
      remainingQuota: voucher.remainingQuota,
      totalQuota: voucher.totalQuota,
      totalClaims: voucher.totalClaimed,
      uniqueUsers: voucher.uniqueUsers,
      totalClaimValue: voucher.totalClaimValue,
    };
  });

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

  const handleStatusChange = async (voucherId, newStatus) => {
    // Add voucher to updating set
    setUpdatingVouchers(prev => new Set(prev.add(voucherId)));
    
    try {
      // Optimistic update: immediately update the UI
      const optimisticVouchers = vouchers.map(voucher => 
        voucher.id === voucherId 
          ? { ...voucher, isActive: newStatus }
          : voucher
      );
      
      // Update local state immediately for better UX
      mutate({
        ...apiResponse,
        data: {
          ...apiResponse.data,
          Data: {
            ...apiResponse.data.Data,
            data: optimisticVouchers
          }
        }
      }, false); // Don't revalidate yet
      
      // Call the API to update voucher status
      await updateVoucherStatusById(voucherId, newStatus);
      
      // Revalidate data from server to ensure consistency
      await mutate();
      
      console.log(`Voucher status updated successfully: ${newStatus ? 'Active' : 'Inactive'}`);
    } catch (error) {
      console.error("Error updating voucher status:", error);
      
      // Revert optimistic update on error
      await mutate();
      
      // Optional: Show error message to user
      alert("Failed to update voucher status. Please try again.");
    } finally {
      // Remove voucher from updating set
      setUpdatingVouchers(prev => {
        const newSet = new Set(prev);
        newSet.delete(voucherId);
        return newSet;
      });
    }
  };

  if (error) {
    console.error("Error fetching vouchers:", error);
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold">
        {t("MasterVoucher.title", {}, "Master Voucher")}
      </h1>
      <div>
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
      </div>

      <MasterVoucherTable
        isExpired={activeTab === "expired"}
        data={vouchers}
        loading={loading}
        updatingVouchers={updatingVouchers}
        onSearch={handleSearch}
        onFilter={handleFilter}
        onSort={handleSort}
        onStatusChange={handleStatusChange}
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
